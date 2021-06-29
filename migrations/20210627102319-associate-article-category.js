'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
        `articlesCategories`,
        {
          articleId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          categoryId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
        }
    );
  },

  down: (queryInterface) => {
    // remove table
    return queryInterface.dropTable(`articlesCategories`);
  },
};
