"use strict";

const {HttpCode} = require(`../../constants`);

const Joi = require(`joi`);

const schema = Joi.object({
  categories: Joi.array().items(
      Joi.number().integer().positive()
  ).min(1).required(),
  title: Joi.string().min(10).max(100).required(),
  announce: Joi.string().min(50).max(1000).required(),
  fullText: Joi.string().min(50).max(1000).required(),
  picture: Joi.string().required(),
  userId: Joi.number().required(),
});

module.exports = (req, res, next) => {
  const newArticle = req.body;

  const {error} = schema.validate(newArticle);

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};

