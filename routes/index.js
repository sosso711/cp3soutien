const postsRouter = require("./posts");
const categoriesRouter = require("./categories");

const setupRoutes = (app) => {
  app.use("/posts", postsRouter);
  app.use("/categories", categoriesRouter);
};

module.exports = {
  setupRoutes,
};
