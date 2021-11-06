'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(`users`, [
      {
        email: `ivanov@example.com`,
        passwordHash: `$2a$10$9QtStHIwDoVw9c57Gof8a.cgBgW38Dh0rjTtAeGjzh.aY.FA02DpK`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar-1.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true,
      },
      {
        email: `petrov@example.com`,
        passwordHash: `$2a$10$uS3UKNcwRZRa1CamrR6ehe2zfGltuiSDZSEXRXdBAjF0g/WpJxj8O`,
        firstName: `Петр`,
        lastName: `Петров`,
        avatar: `avatar-2.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(`users`, null, {});
  }
};
