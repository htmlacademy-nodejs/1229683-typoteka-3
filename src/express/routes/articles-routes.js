'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const {themesList} = require(`./mocks.js`);

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`, {themesList}));
articlesRouter.get(`/add`, (req, res) => res.render(`new-post`, {admin: true}));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articlesRouter;
