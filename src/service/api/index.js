'use strict';

const {Router} = require(`express`);
const categories = require(`../api/categories`);

const getMockData = require(`../lib/get-mock-data`);

const
  CategoryService = require(`../data-service/categories`);

const app = new Router();


(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  // search(app, new SearchService(mockData));
  // offer(app, new OfferService(mockData), new CommentService());
})();

module.exports = app;
