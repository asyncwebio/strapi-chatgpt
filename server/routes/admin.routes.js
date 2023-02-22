"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/prompt",
      handler: "chatGptController.prompt",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/config",
      handler: "chatGptController.getConfig",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/config/update",
      handler: "chatGptController.updateConfig",
      config: {
        policies: [],
      },
    },
  ],
};
