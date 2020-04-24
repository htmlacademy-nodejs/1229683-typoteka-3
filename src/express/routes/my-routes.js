'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my`, {admin: true}));
myRouter.get(`/comments`, (req, res) => res.render(`comments`, {admin: true}));

module.exports = myRouter;
