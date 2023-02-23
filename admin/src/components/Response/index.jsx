import React from "react";

import { Box, Typography } from "@strapi/design-system";

const Response = ({ data }) => {
  if (!data || !data.you || !data.bot) return null;
  const style = {
    wordBreak: "keep-all",
  };
  return (
    <Box>
      <span>
        <Typography style={style}>You: {data.you} </Typography>
      </span>
      <br />
      <span>
        <Typography style={style}>ChatGPT: {data.bot}</Typography>
      </span>
    </Box>
  );
};

export default Response;
