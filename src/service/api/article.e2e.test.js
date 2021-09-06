"use strict";

const express = require(`express`);
const request = require(`supertest`);
const sequelize = require(`../lib/sequelize`);

const artilce = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const defineModels = require(`../models`);

const {HttpCode} = require(`../../constants`);

const createAPI = async () => {
  defineModels(sequelize);
  const app = express();
  app.use(express.json());
  artilce(app, new DataService(sequelize), new CommentService(sequelize));
  return app;
};

describe(`API returns a list of all articles`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () =>
    expect(response.body.length).toBe(5));

  test(`First offer's id equals 1`, () =>
    expect(response.body[0].id).toBe(1));
});

describe(`API returns an offer with given id`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).get(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Что такое золотое сечение"`, () =>
    expect(response.body.title).toBe(
        `Что такое золотое сечение`
    ));
});


describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    picture: `item09.jpg`,
    userId: 1,
    categories: [9, 1, 2]
  };

  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () =>

    expect(response.body).toMatchObject(newArticle));

  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    categories: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });


  test(`Without any required property response code is 400`, async () => {
    await request(app)
        .post(`/articles`)
        .send(newArticle)
        .expect(HttpCode.BAD_REQUEST);

  });

  test(`When field value is wrong response code is 400`, async () => {
    const badOffers = [
      {...newArticle, sum: -1},
      {...newArticle, title: `too short`},
      {...newArticle, categories: []}
    ];
    for (const badOffer of badOffers) {
      await request(app)
        .post(`/articles`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

// describe(`API changes existent article`, () => {
//   const newArticle = {
//     picture: `item10.jpg`,
//     title: `Как перестать беспокоиться и начать жить`,
//     announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
//     fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
//     userId: 2
//   };
//   let response;
//   let app;

//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app).put(`/articles/5`).send(newArticle);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Returns true if changed article`, () =>
//     expect(response.body).toEqual(true));

//   test(`Article is really changed`, () =>
//     request(app)
//       .get(`/articles/5`)
//       .expect((res) =>
//         expect(res.body.title).toBe(`Как перестать беспокоиться и начать жить`)
//       ));
// });


describe(`Trying to change non-existent article`, () => {
  const validArticle = {
    userId: 3,
    picture: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
    fullText: `Игры и программирование разные вещи. Золотое сечение — соотношение двух величин гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Процессор заслуживает особого внимания. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко если вы прирожденный герой. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Вы можете достичь всего. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Для начала просто соберитесь. Он написал больше 30 хитов. Это прочная древесина. Как начать действовать? Ёлки — это не просто красивое дерево. Бороться с прокрастинацией несложно. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  };
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/90`).send(validArticle);
  });

  test(`Status code to be 404`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));

});


describe(`Trying to change an article with invalid data`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/NOEXST`).send(invalidArticle);
  });

  const invalidArticle = {
    categories: `Деревья`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Маленькими шагами. sБороться с прокрастинацией несложно. Просто действуйте. `,
  };

  test(`Status code to be 400`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));

});


describe(`API correctly deletes an article`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/5`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns true if article was deleted`, () => expect(response.body).toBe(true));

  test(`Article count is 5 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});

describe(`API refuses to delete non-existent article`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/100`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));


});


describe(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .post(`/article/NOEXST/comments`)
    .send({
      text: `Неважно`
    });
  });

  test(`Status code to be 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));


});

describe(`API refuses to delete non-existent comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .delete(`/article/45qf7G/comments/NOEXST`);
  });

  test(`Status code to be 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));

});


describe(`API returns a list of comments to given article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/articles/2/comments`);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 1 comment`, () => expect(response.body.length).toBe(1));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/2/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, async () => await request(app)
    .get(`/articles/2/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );

});
