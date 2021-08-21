"use strict";

const {Router} = require(`express`);
const categories = require(`../api/categories`);
const search = require(`../api/search`);
const article = require(`../api/article`);


const {
  CategoryService,
  SearchService,
  ArticleSerice,
  CommentService,
} = require(`../data-service`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
defineModels(sequelize);

const app = new Router();

(async () => {

  categories(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
  article(app, new ArticleSerice(sequelize), new CommentService(sequelize));
})();

module.exports = app;
