"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);
const isAdmin = require(`../middlewares/isAdmin`);

const myRouter = new Router();

myRouter.get(`/articles`, auth, isAdmin, async (req, res) => {
  const {user} = req.session;

  const articles = await api.getArticles({isNeedComments: false});
  res.render(`my-articles`, {articles, user});
});
myRouter.get(`/comments`, auth, isAdmin, async (req, res) => {
  const {user} = req.session;

  const comments = await api.getComments();

  res.render(`comments`, {comments, user});
});

myRouter.get(`/categories`, auth, isAdmin, async (req, res) => {
  const {user} = req.session;

  const categories = await api.getCategories();

  res.render(`all-categories`, {categories, user});
});

module.exports = myRouter;
