"use strict";

const {Router} = require(`express`);
const categories = require(`../api/categories`);
const search = require(`../api/search`);
const article = require(`../api/article`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  ArticleSerice,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  article(app, new ArticleSerice(mockData), new CommentService());
})();

module.exports = app;
