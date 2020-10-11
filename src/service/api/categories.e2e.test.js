const express = require(`express`);
const request = require(`supertest`);

const { HttpCode } = require(`../../constants`);
const categories = require(`./categories`);
const DataService = require(`../data-service/categories`);

const mockData = [
  {
    id: "J-dT51",
    title: "Обзор новейшего смартфона",
    announce:
      "Этот смартфон — настоящая находка. Стоит только немного постараться и запастись книгами. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов.",
    fullText:
      "Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Игры и программирование разные вещи. Альбом стал настоящим открытием года. Для начала просто соберитесь. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Вы можете достичь всего. Маленькими шагами. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Просто действуйте. Так ли это на самом деле? Стоит только немного постараться и запастись книгами. Как начать действовать? Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Программировать не настолько сложно как об этом говорят. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин гармоническая пропорция. Это один из лучших рок-музыкантов. Не стоит идти в программисты если вам нравится только игры. Освоить вёрстку несложно. Процессор заслуживает особого внимания. Собрать камни бесконечности легко если вы прирожденный герой.",
    createdDate: "2020-07-09 20:34:44",
    category: ["Без рамки", "За жизнь", "Музыка"],
    comments: [
      {
        id: "pcyUzx",
        text: "Хочу такую же футболку :-) Плюсую, но слишком много буквы!",
      },
      { id: "JhnPDQ", text: "Планируете записать видосик на эту тему?" },
      { id: "h12MzI", text: "Это где ж такие красоты?" },
    ],
  },
  {
    id: "45qf7G",
    title: "Самый лучший музыкальный альбом этого года",
    announce:
      "Не стоит идти в программисты если вам нравится только игры. Просто действуйте. Освоить вёрстку несложно. Как начать действовать? Программировать не настолько сложно как об этом говорят.",
    fullText:
      "Маленькими шагами. Бороться с прокрастинацией несложно. Не стоит идти в программисты если вам нравится только игры. Рок-музыка всегда ассоциировалась с протестами. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Программировать не настолько сложно как об этом говорят. Это прочная древесина. Как начать действовать? Процессор заслуживает особого внимания. Освоить вёрстку несложно. Для начала просто соберитесь. Игры и программирование разные вещи. Вы можете достичь всего.",
    createdDate: "2020-29-08 08:02:25",
    category: ["Разное", "Кино", "За жизнь"],
    comments: [
      {
        id: "vz5TFV",
        text:
          "Хочу такую же футболку :-) Согласен с автором! Мне кажется или я уже читал это где-то?",
      },
      {
        id: "4FACyc",
        text:
          "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?",
      },
    ],
  },
];

const app = express();
app.use(express.json());
categories(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 5 categories`, () =>
    expect(response.body.length).toBe(5));

  test(`Category names are "Без рамки", "За жизнь", "Музыка", "Разное", "Кино"`, () =>
    expect(response.body).toEqual(
      expect.arrayContaining([
        "Без рамки",
        "За жизнь",
        "Музыка",
        "Разное",
        "Кино",
      ])
    ));
});