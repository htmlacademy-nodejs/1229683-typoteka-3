'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const {news, themesList, latestComments} = require(`./mocks.js`);

mainRouter.get(`/`, (req, res) => res.render(`main`, {news, themesList, latestComments}));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`, {
  admin: true
}));
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`, {admin: true}));

module.exports = mainRouter;
