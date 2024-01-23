import React from "react";

import { Box, Typography } from "@strapi/design-system";

const style = {
  wordBreak: "keep-all",
};

function transfromBotText(message) {
  console.log(message)
  try {
     const url = new URL(message);
  } catch (error) {
    // If not image then return message
    return (<Typography style={style}>ChatGPT: {message}</Typography>)
  }

  // If Url return render Img
  return (<Typography style={style}>ChatGPT: <a href={message}>Picture Link</a>
    <br />
    <img src={message} height={300} width={350} />
  </Typography>)
}

const Response = ({ data }) => {
  if (!data || !data.you || !data.bot) return null;

  return (
    <Box>
      <span>
        <Typography style={style}>You: {data.you} </Typography>
      </span>
      <br />
      <span>
        ChatGPT: <br/>{transfromBotText(data.bot)}
      </span>
    </Box>
  );
};

export default Response;
