"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();
const {latestComments} = require(`./mocks.js`);

mainRouter.get(`/`, async (req, res) => {
  const [articles, categories] = await Promise.all([
    api.getArticles({isNeedComments: true}),
    api.getCategories(true)
  ]);
  res.render(`main`, {news: articles, articles, themesList: categories, latestComments});
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
