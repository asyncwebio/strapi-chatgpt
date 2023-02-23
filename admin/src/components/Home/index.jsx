import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import axios from "axios";
import { auth } from "@strapi/helper-plugin";
import {
  Button,
  TextInput,
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Card,
  CardBody,
  CardContent,
  Grid,
  GridItem,
  IconButton,
  ActionLayout,
  Tooltip,
  Stack,
  Divider,
} from "@strapi/design-system";
import { PaperPlane, Command, Trash, Cog } from "@strapi/icons";
import Response from "../Response";
import Help from "../Help";
import LoadingOverlay from "../Loading";
import ClearChatGPTResponse from "../ClearChatGPTResponse";
import Integration from "../Integration";

const Home = () => {
  const { formatMessage } = useIntl();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApiIntegrationModalVisible, setIsApiIntegrationModalVisible] =
    useState(false);
  const [
    isClearChatGPTResponseModalVisible,
    setIsClearChatGPTResponseModalVisible,
  ] = useState(false);

  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.getToken()}`,
      "Content-Type": "application/json",
    },
  });

  const clearResponses = () => {
    setResponses([]);
    setIsClearChatGPTResponseModalVisible(false);
  };

  const handleInputChange = (e) => {
    setError(false);
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!content) {
      setError("Prompt is required");
      return;
    }
    setLoading(true);
    const { data } = await instance.post("/strapi-chatgpt/prompt", {
      prompt: content,
    });
    if (data.error || !data.response) {
      setLoading(false);
      setError(data.error);
      return;
    }

    setResponses([
      ...responses,
      {
        you: content,
        bot: data.response,
      },
    ]);
    setLoading(false);
    setContent("");
  };

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  return (
    <Layout>
      <Helmet title={"Strapi ChatGPT"} />
      <Main aria-busy={false}>
        <HeaderLayout
          title={"ChatGPT"}
          subtitle={formatMessage({
            id: "chatgpt-headder",
            defaultMessage: "ChatGPT plugin for Strapi",
          })}
        />

        <ActionLayout
          startActions={
            <Stack horizontal gap={2}>
              <Button
                variant="secondary"
                startIcon={<Command />}
                onClick={() => setIsModalVisible(true)}
              >
                Prompt
              </Button>
              <Button
                variant="secondary"
                startIcon={<Cog />}
                onClick={() => setIsApiIntegrationModalVisible(true)}
              >
                API Integration
              </Button>
            </Stack>
          }
          endActions={
            <Tooltip description="Clear chatGPT history" position="left">
              <IconButton
                disabled={loading || responses.length === 0}
                onClick={() => setIsClearChatGPTResponseModalVisible(true)}
                icon={<Trash />}
              />
            </Tooltip>
          }
        />

        <ContentLayout>
          <ClearChatGPTResponse
            isOpen={isClearChatGPTResponseModalVisible}
            setIsOpen={setIsClearChatGPTResponseModalVisible}
            onConfirm={clearResponses}
          />
          <Card style={{ position: "relative" }}>
            <CardBody
              style={{
                height: "64vh",
                overflowY: "scroll",
              }}
            >
              <CardContent>
                <LoadingOverlay isLoading={loading} />
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      overflow: "auto",
                      justifyContent: "flex-end",
                    }}
                  >
                    {responses.map((response, index) => (
                      <>
                        <Response key={index + "123"} data={response} />
                        <Box paddingTop={2} paddingBottom={4}>
                          <Divider />
                        </Box>
                      </>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </CardContent>
            </CardBody>
          </Card>

          <Box>
            <form onSubmit={handleSubmit}>
              <Grid gap={2} paddingTop={4}>
                <GridItem col={10}>
                  <TextInput
                    id="chatInput"
                    placeholder="Enter your prompt here"
                    aria-label="Content"
                    name="content"
                    error={error}
                    onChange={handleInputChange}
                    value={content}
                    disabled={loading}
                    onpaste={(e) => {
                      e.preventDefault();
                      setError(false);
                    }}
                  />
                </GridItem>
                <GridItem col={2}>
                  <Button
                    fullWidth
                    size="L"
                    startIcon={<PaperPlane />}
                    type="submit"
                    loading={loading}
                  >
                    Send
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </Box>
        </ContentLayout>

        <Help
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        <Integration
          isOpen={isApiIntegrationModalVisible}
          onClose={() => setIsApiIntegrationModalVisible(false)}
        />
      </Main>
    </Layout>
  );
};

export default Home;
