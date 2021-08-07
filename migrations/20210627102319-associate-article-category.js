"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(`articlesCategories`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: (queryInterface) => {
    // remove table
    return queryInterface.dropTable(`articlesCategories`);
  },
};
