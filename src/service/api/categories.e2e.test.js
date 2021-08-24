"use strict";

const express = require(`express`);
const request = require(`supertest`);

const {HttpCode} = require(`../../constants`);
const categories = require(`./categories`);
const DataService = require(`../data-service/categories`);
const defineModels = require(`../models`);
const sequelize = require(`../lib/sequelize`);

const createAPI = async () => {
  defineModels(sequelize);
  const app = express();
  app.use(express.json());
  categories(app, new DataService(sequelize));
  return app;
};

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 9 categories`, () =>
    expect(response.body.length).toBe(9));

  test(`Category names are "Деревья", "За жизнь", "Программирование", "IT", "Железо", "Без рамки",  "Музыка", "Разное", "Кино"`, () =>
    expect(response.body).toEqual(
        expect.arrayContaining([{"id": 1, "title": `Деревья`}, {"id": 2, "title": `За жизнь`}, {"id": 3, "title": `Без рамки`}, {"id": 4, "title": `Разное`}, {"id": 5, "title": `IT`}, {"id": 6, "title": `Музыка`}, {"id": 7, "title": `Кино`}, {"id": 8, "title": `Программирование`}, {"id": 9, "title": `Железо`}])
    ));
});
