"use strict";

const express = require(`express`);
const request = require(`supertest`);

const {HttpCode} = require(`../../constants`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const defineModels = require(`../models`);
const sequelize = require(`../lib/sequelize`);


const createAPI = async () => {
  defineModels(sequelize);
  const app = express();
  app.use(express.json());
  search(app, new DataService(sequelize));
  return app;
};


describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).get(`/search`).query({
      query: `золотое`,
    });

  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct id`, () =>
    expect(response.body[0].id).toBe(1));
});

test(`API returns code 404 if nothing is found`, async () =>{
  const app = await createAPI();

  await request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`,
    })
    .expect(HttpCode.NOT_FOUND);
});


test(`API returns 400 when query string is absent`, async () => {
  const app = await createAPI();

  await request(app).get(`/search`).expect(HttpCode.BAD_REQUEST);
});
