"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(`categories`, [
      {title: `Деревья`},
      {title: `За жизнь`},
      {title: `Без рамки`},
      {title: `Разное`},
      {title: `IT`},
      {title: `Музыка`},
      {title: `Кино`},
      {title: `Программирование`},
      {title: `Железо`},
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(`categories`, null, {});
  },
};
