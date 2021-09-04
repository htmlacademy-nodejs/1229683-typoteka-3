"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();
const {latestComments} = require(`./mocks.js`);

const ARTICLES_PER_PAGE = 2;

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = ARTICLES_PER_PAGE;
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const [{count, articles}, categories] = await Promise.all([
    api.getArticles({isNeedComments: true, limit, offset}),
    api.getCategories(true)
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  res.render(`main`, {news: articles, articles, themesList: categories, page, totalPages, latestComments});
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`search-results`, {results});
  } catch (err) {
    res.render(`search`, {
      results: [],
    });
  }
});
mainRouter.get(`/categories`, (req, res) => res.render(`articles-by-category`));

module.exports = mainRouter;
