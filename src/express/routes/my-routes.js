"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my-articles`, {articles});
});
myRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = myRouter;
