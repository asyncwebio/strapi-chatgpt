import React from "react";
import { Box, Loader } from "@strapi/design-system";

const Loading = ({ isLoading }) => {
  const styles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "black",
    opacity: "0.6",
    justifyContent: "center",
    alignItems: "center",
    display: isLoading ? "flex" : "none",
  };
  return (
    <Box style={styles}>
      <Loader />
    </Box>
  );
};

export default Loading;
