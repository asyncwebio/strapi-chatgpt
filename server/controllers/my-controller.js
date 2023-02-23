'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-chatgpt')
      .service('myService')
      .getWelcomeMessage();
  },
});
