"use strict";

module.exports = {
  up: (queryInterface) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(`articlesCategories`);
  },

  down: (queryInterface) => {
    // remove table
    return queryInterface.dropTable(`articlesCategories`);
  },
};
