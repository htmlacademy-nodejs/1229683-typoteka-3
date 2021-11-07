"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const categoryValidator = require(`../middlewares/category-validator`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const {needCount} = req.query;
    const categories = await service.findAll(needCount);
    res.status(HttpCode.OK).json(categories);
  });

  route.post(`/`, categoryValidator, async (req, res) => {
    let category;
    try {
      category = await service.create(req.body.category);
    } catch (err) {
      return res.status(HttpCode.BAD_REQUEST).send(err);
    }

    return res.status(HttpCode.CREATED).send(category);

  });

  route.get(`/:id`, async (req, res) => {
    const {id} = req.params;
    const {limit, offset} = req.query;

    const category = await service.findOne(id);

    const {count, articlesByCategory} = await service.findPage(id, limit, offset);

    res.status(HttpCode.OK)
      .json({
        category,
        count,
        articlesByCategory
      });
  });
};
