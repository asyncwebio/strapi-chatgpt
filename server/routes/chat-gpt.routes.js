"use strict";

module.exports = {
  type: "content-api",
  routes: [
    {
      method: "POST",
      path: "/prompt",
      handler: "chatGptController.prompt",
      config: {
        policies: [],
      },
    },
  ],
};
