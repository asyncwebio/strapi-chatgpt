"use strict";

module.exports = {
  routes: [
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
