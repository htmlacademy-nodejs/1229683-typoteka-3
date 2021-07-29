"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(`articlesCategories`, [
      {articleId: 1, categoryId: 1},
      {articleId: 2, categoryId: 2},
      {articleId: 3, categoryId: 3},
      {articleId: 4, categoryId: 4},
      {articleId: 4, categoryId: 5},
      {articleId: 5, categoryId: 6},
      {articleId: 1, categoryId: 7},
      {articleId: 2, categoryId: 8},
      {articleId: 2, categoryId: 9},
      {articleId: 3, categoryId: 2},

    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(`articlesCategories`, null, {});
  },
};

