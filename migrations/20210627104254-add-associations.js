'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        `comments`, // name of Source model
        `articleId`, // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: `articles`, // name of Target model
            key: `id`, // key in Target model that we're referencing
          },
          onUpdate: `CASCADE`,
          onDelete: `SET NULL`,
        }
    )
    .then(() => {
      return queryInterface.addColumn(
          `comments`, // name of Source model
          `userId`, // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: `users`, // name of Target model
              key: `id`, // key in Target model that we're referencing
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          `articles`, // name of Source model
          `userId`, // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: `users`, // name of Target model
              key: `id`, // key in Target model that we're referencing
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn(
        `comments`, // name of Source model
        `articleId` // key we want to remove
    ).then(() => {
      return queryInterface.removeColumn(
          `comments`, // name of Source model
          `userId` // key we want to remove
      );
    }).then(() => {
      return queryInterface.removeColumn(
          `articles`, // name of Source model
          `userId` // key we want to remove
      );
    });
  }
};
