"use strict";

const chatGptRoutes = require("./chat-gpt.routes");
const adminRoutes = require("./admin.routes");

module.exports = {
  "admin-api": adminRoutes,
  "content-api": chatGptRoutes,
};
