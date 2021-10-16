"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const auth = require(`../../service/middlewares/auth`);

const myRouter = new Router();

myRouter.get(`/`, auth, async (req, res) => {
  const {user} = req.session;

  const articles = await api.getArticles({isNeedComments: false});
  res.render(`my-articles`, {articles, user});
});
myRouter.get(`/comments`, auth, async (req, res) => {
  const {user} = req.session;

  const articles = await api.getArticles({isNeedComments: true});
  res.render(`comments`, {comments: articles.slice(0, 3), user});
});

module.exports = myRouter;
