"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);

const myRouter = new Router();

myRouter.get(`/articles`, auth, async (req, res) => {
  const {user} = req.session;

  const articles = await api.getArticles({isNeedComments: false});
  res.render(`my-articles`, {articles, user});
});
myRouter.get(`/comments`, auth, async (req, res) => {
  const {user} = req.session;

  const comments = await api.getComments();

  res.render(`comments`, {comments, user});
});

module.exports = myRouter;
