"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(`articles`, [
      {
        title: `Что такое золотое сечение`,
        announce: `Рок-музыка всегда ассоциировалась с протестами. Альбом стал настоящим открытием года. Программировать не настолько сложно как об этом говорят. Это один из лучших рок-музыкантов. Вы можете достичь всего.`,
        fullText: `Это один из лучших рок-музыкантов. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин гармоническая пропорция. Это прочная древесина.`,
        picture: `item04.jpg`,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: `Самый лучший музыкальный альбом этого года`,
        announce: `Альбом стал настоящим открытием года. Это один из лучших рок-музыкантов. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Первая большая ёлка была установлена только в 1938 году. Он обязательно понравится геймерам со стажем.`,
        fullText: `Это прочная древесина. Освоить вёрстку несложно. Так ли это на самом деле? Альбом стал настоящим открытием года. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно как об этом говорят. Просто действуйте. Первая большая ёлка была установлена только в 1938 году. Процессор заслуживает особого внимания. Маленькими шагами. Бороться с прокрастинацией несложно. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Золотое сечение — соотношение двух величин гармоническая пропорция.`,
        picture: `item05.jpg`,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: `Как достигнуть успеха не вставая с кресла`,
        announce: `Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Маленькими шагами. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Так ли это на самом деле?`,
        fullText: `Вы можете достичь всего. Собрать камни бесконечности легко если вы прирожденный герой. Программировать не настолько сложно как об этом говорят. Бороться с прокрастинацией несложно. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Процессор заслуживает особого внимания. Первая большая ёлка была установлена только в 1938 году. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Для начала просто соберитесь. Достичь успеха помогут ежедневные повторения. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин гармоническая пропорция. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Это прочная древесина. Возьмите книгу новую книгу и закрепите все упражнения на практике. Просто действуйте. Как начать действовать? Он обязательно понравится геймерам со стажем. Так ли это на самом деле? Из под его пера вышло 8 платиновых альбомов. Рок-музыка всегда ассоциировалась с протестами. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно.`,
        picture: `item03.jpg`,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: `Ёлки. История деревьев`,
        announce: `Ёлки — это не просто красивое дерево. Он написал больше 30 хитов. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
        fullText: `Просто действуйте. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
        picture: `item09.jpg`,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: `Учим HTML и CSS`,
        announce: `Он обязательно понравится геймерам со стажем. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Как начать действовать? Так ли это на самом деле?`,
        fullText: `Это прочная древесина. Достичь успеха помогут ежедневные повторения. Не стоит идти в программисты если вам нравится только игры. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Он обязательно понравится геймерам со стажем. Для начала просто соберитесь.`,
        picture: `item07.jpg`,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(`articles`, null, {});
  },
};
