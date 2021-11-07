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

  route.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    const {count} = await service.findPage(id, 0, 0);

    if (count > 0) {
      return res.status(HttpCode.BAD_REQUEST).send(`Категория не может быть удалена если ей принадлежит хотя бы одна публикация`);
    }

    const deletedCategory = await service.drop(id);

    if (!deletedCategory) {
      return res.status(HttpCode.NOT_FOUND).send(`Данной категории не существует`);
    }

    return res.status(HttpCode.OK).send(deletedCategory);

  });

  route.put(`/:id`, categoryValidator, async (req, res) => {
    const {id} = req.params;
    const existCategory = await service.findOne(id);

    if (!existCategory) {
      return res.status(HttpCode.NOT_FOUND).send(`Данной категории не существует`);
    }

    const updatedCategory = await service.update(id, req.body.category);

    return res.status(HttpCode.OK).send(updatedCategory);
  });
};
