import React from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  Typography,
  Box,
} from "@strapi/design-system";

const Help = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <ModalLayout onClose={() => onClose(!isOpen)} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Help
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Typography variant="omega">
              You may use prompts such as the followings to get meaningful
              response from chatGPT:
            </Typography>
            <br />
            <br />
            <Typography variant="omega">
              <ol>
                <li>
                  1. Create a quiz with 5 multiple choice questions that assess
                  students' understanding of [concept being taught]
                </li>
                <li>2. Find the bug with this code: [post code below]</li>
                <li>3. What exactly does this regex do? rege(x(es)?|xps?)</li>
                <li>4. Describe [topic of your choice] in detail</li>
                <li>
                  5. Please provide a definition for the medical term
                  'tachycardia'
                </li>
              </ol>
            </Typography>
            <br />
            <Typography variant="omega">
              <a href="https://classplusplus.com/chatgpt/" target="_blank">
                Click here
              </a>{" "}
              for more ChatGPT prompts.
            </Typography>
          </ModalBody>
        </ModalLayout>
      )}
    </>
  );
};

export default Help;
