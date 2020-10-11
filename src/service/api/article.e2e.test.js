"use strict";

const express = require(`express`);
const request = require(`supertest`);

const artilce = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `J-dT51`,
    title: `Обзор новейшего смартфона`,
    announce: `Этот смартфон — настоящая находка. Стоит только немного постараться и запастись книгами. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Игры и программирование разные вещи. Альбом стал настоящим открытием года. Для начала просто соберитесь. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Вы можете достичь всего. Маленькими шагами. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Просто действуйте. Так ли это на самом деле? Стоит только немного постараться и запастись книгами. Как начать действовать? Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Программировать не настолько сложно как об этом говорят. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин гармоническая пропорция. Это один из лучших рок-музыкантов. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Процессор заслуживает особого внимания. Собрать камни бесконечности легко если вы прирожденный герой.`,
    createdDate: `2020-07-09 20:34:44`,
    category: [`Без рамки`, `За жизнь`, `Музыка`],
    comments: [
      {
        id: `pcyUzx`,
        text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы!`,
      },
      {id: `JhnPDQ`, text: `Планируете записать видосик на эту тему?`},
      {id: `h12MzI`, text: `Это где ж такие красоты?`},
    ],
  },
  {
    id: `45qf7G`,
    title: `Самый лучший музыкальный альбом этого года`,
    announce: `Не стоит идти в программисты если вам нравится только игры. Просто действуйте. Освоить вёрстку несложно. Как начать действовать? Программировать не настолько сложно как об этом говорят.`,
    fullText: `Маленькими шагами. Бороться с прокрастинацией несложно. Не стоит идти в программисты если вам нравится только игры. Рок-музыка всегда ассоциировалась с протестами. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Программировать не настолько сложно как об этом говорят. Это прочная древесина. Как начать действовать? Процессор заслуживает особого внимания. Освоить вёрстку несложно. Для начала просто соберитесь. Игры и программирование разные вещи. Вы можете достичь всего.`,
    createdDate: `2020-29-08 08:02:25`,
    category: [`Разное`, `Кино`, `За жизнь`],
    comments: [
      {
        id: `vz5TFV`,
        text: `Хочу такую же футболку :-) Согласен с автором! Мне кажется или я уже читал это где-то?`,
      },
      {
        id: `4FACyc`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`,
      },
    ],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  artilce(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 2 articles`, () =>
    expect(response.body.length).toBe(2));

  test(`First offer's id equals "J-dT51"`, () =>
    expect(response.body[0].id).toBe(`J-dT51`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/45qf7G`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Самый лучший музыкальный альбом этого года"`, () =>
    expect(response.body.title).toBe(
        `Самый лучший музыкальный альбом этого года`
    ));
});


describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    category: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(3)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    category: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/articles/45qf7G`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () =>
    request(app)
      .get(`/articles/45qf7G`)
      .expect((res) =>
        expect(res.body.title).toBe(`Как перестать беспокоиться и начать жить`)
      ));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    category: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});


test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/article/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/article/45qf7G/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});


describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/J-dT51/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's id is "pcyUzx"`, () => expect(response.body[0].id).toBe(`pcyUzx`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/J-dT51/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/J-dT51/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});
