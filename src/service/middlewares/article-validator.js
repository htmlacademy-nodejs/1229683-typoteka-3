"use strict";

const {HttpCode} = require(`../../constants`);

const Joi = require(`joi`);

const ErrorOfferMessage = {
  CATEGORIES: `Не выбрана ни одна категория объявления`,
  TITLE_MIN: `Заголовок содержит меньше 10 символов`,
  TITLE_MAX: `Заголовок не может содержать более 100 символов`,
  ANNOUNCE_MIN: `Описание содержит меньше 50 символов`,
  ANNOUNCE_MAX: `Описание не может содержать более 1000 символов`,
  FULL_TEXT_MIN: `Описание содержит меньше 50 символов`,
  FULL_TEXT_MAX: `Описание не может содержать более 1000 символов`,
  PICTURE: `Изображение не выбрано или тип изображения не поддерживается`,
  TYPE: `Не выбран ни один тип объявления`,
  SUM: `Сумма не может быть меньше 100`,
  USER_ID: `Некорректный идентификатор пользователя`
};


const schema = Joi.object({
  categories: Joi.array().items(
      Joi.number().integer().positive()
  ).min(1).required().messages({
    'number.base': ErrorOfferMessage.CATEGORIES
  }),
  title: Joi.string().min(10).max(100).required().messages({
    'string.min': ErrorOfferMessage.TITLE_MIN,
    'string.max': ErrorOfferMessage.TITLE_MAX
  }),
  announce: Joi.string().min(50).max(1000).required().messages({
    'string.min': ErrorOfferMessage.ANNOUNCE_MIN,
    'string.max': ErrorOfferMessage.ANNOUNCE_MAX
  }),
  fullText: Joi.string().min(50).max(1000).required().messages({
    'string.min': ErrorOfferMessage.FULL_TEXT_MIN,
    'string.max': ErrorOfferMessage.FULL_TEXT_MAX
  }),
  picture: Joi.string().required().messages({
    'string.empty': ErrorOfferMessage.PICTURE
  }),
  userId: Joi.number().required().messages({
    'number.base': ErrorOfferMessage.USER_ID
  }),
});

module.exports = (req, res, next) => {
  const newArticle = req.body;

  const {error} = schema.validate(newArticle, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};

