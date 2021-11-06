"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const upload = require(`../middlewares/upload`);
const auth = require(`../middlewares/auth`);

const mainRouter = new Router();

const ARTICLES_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  const {user} = req.session;
  page = +page;

  const limit = ARTICLES_PER_PAGE;
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const [{count, articles}, categories, latestComments] = await Promise.all([
    api.getArticles({isNeedComments: true, limit, offset}),
    api.getCategories(true),
    api.getComments(),
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  const hottest = articles.sort((a, b) => b.comments.length - a.comments.length);

  res.render(`main`, {news: hottest.slice(0, 4), articles, categories, page, totalPages, latestComments, user});
});
mainRouter.get(`/register`, (req, res) => res.render(`register`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
  const {user} = req.session;

  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`search-results`, {results, user});
  } catch (err) {
    res.render(`search`, {
      results: [],
      user
    });
  }
});
mainRouter.get(`/categories`, (req, res) => {
  const {user} = req.session;

  res.render(`articles-by-category`, {user});
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const userData = {
    avatar: file ? file.filename : ``,
    firstName: body[`first-name`],
    lastName: body[`last-name`],
    email: body[`email`],
    password: body[`password`],
    passwordRepeated: body[`password-repeat`]
  };

  try {
    await api.createUser({data: userData});

    res.redirect(`/login`);
  } catch (errors) {
    const user = req.body;

    res.render(`register`, {messages: errors.response.data, user});
  }
});

mainRouter.post(`/login`, async (req, res) => {
  const email = req.body[`email`];
  const password = req.body[`password`];

  try {
    const user = await api.auth({email, password});

    req.session.user = user;
    req.session.save(() => {
      res.redirect(`/`);
    });
  } catch (errors) {
    const user = req.body;

    res.render(`login`, {user, message: errors.response.data || `Что-то пошло не так. Повторите позднее`});
  }
});

mainRouter.get(`/logout`, auth, (req, res) => {
  delete req.session.user;
  req.session.save(() => res.redirect(`/`));
});

module.exports = mainRouter;
