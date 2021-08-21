"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles({isNeedComments: false});
  res.render(`my-articles`, {articles});
});
myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles({isNeedComments: true});
  res.render(`comments`, {comments: articles.slice(0, 3)});
});

module.exports = myRouter;
