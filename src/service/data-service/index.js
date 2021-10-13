'use strict';

const CategoryService = require(`./categories`);
const SearchService = require(`./search`);
const ArticleSerice = require(`./article`);
const CommentService = require(`./comment`);
const UserService = require(`./user`);

module.exports = {
  CategoryService,
  SearchService,
  ArticleSerice,
  CommentService,
  UserService
};
