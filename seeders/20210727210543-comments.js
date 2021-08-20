'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(`comments`, [
      {
        text: `Хочу такую же футболку :-)`,
        articleId: 1,
        userId: 1,
        createdAt: new Date(),
      },
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
        articleId: 2,
        userId: 2,
        createdAt: new Date(),
      },
      {
        text: `Согласен с автором!`,
        articleId: 3,
        userId: 2,
        createdAt: new Date(),
      },
      {
        text: `Совсем немного...`,
        articleId: 4,
        userId: 1,
        createdAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(`comments`, null, {});
  }
};
