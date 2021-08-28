"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable(`articlesCategories`, {
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(`articlesCategories`);
  },
};
