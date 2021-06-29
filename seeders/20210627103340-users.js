'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(`users`, [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dccffffaa765d61d8327deb882cf99`,
        firstName: `Петр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(`users`, null, {});
  }
};
