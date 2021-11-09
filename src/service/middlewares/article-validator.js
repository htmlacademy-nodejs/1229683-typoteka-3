"use strict";

const {HttpCode} = require(`../../constants`);

const Joi = require(`joi`);

const ErrorOfferMessage = {
  CATEGORIES: `Не выбрана ни одна категория объявления`,
  TITLE_MIN: `Заголовок содержит меньше 30 символов`,
  TITLE_MAX: `Заголовок не может содержать более 250 символов`,
  ANNOUNCE_MIN: `Анонс содержит меньше 30 символов`,
  ANNOUNCE_MAX: `Анонс не может содержать более 250 символов`,
  FULL_TEXT_MAX: `Описание не может содержать более 1000 символов`,
  PICTURE: `Изображение не выбрано или тип изображения не поддерживается`,
  USER_ID: `Некорректный идентификатор пользователя`,
  DATE: `Дата некорректная`,
};


const schema = Joi.object({
  categories: Joi.array().items(
      Joi.number().integer().positive()
  ).min(1).required().messages({
    'number.base': ErrorOfferMessage.CATEGORIES
  }),
  title: Joi.string().min(30).max(250).required().messages({
    'string.min': ErrorOfferMessage.TITLE_MIN,
    'string.max': ErrorOfferMessage.TITLE_MAX
  }),
  announce: Joi.string().min(30).max(250).required().messages({
    'string.min': ErrorOfferMessage.ANNOUNCE_MIN,
    'string.max': ErrorOfferMessage.ANNOUNCE_MAX
  }),
  fullText: Joi.string().allow(``).optional().max(1000).messages({
    'string.max': ErrorOfferMessage.FULL_TEXT_MAX
  }),
  picture: Joi.string().allow(``).optional().messages({
    'string.empty': ErrorOfferMessage.PICTURE
  }),
  userId: Joi.number().required().messages({
    'number.base': ErrorOfferMessage.USER_ID
  }),
  date: Joi.string().required().messages({
    'date.empty': ErrorOfferMessage.DATE
  }),
});

module.exports = (req, res, next) => {
  const newArticle = req.body;

  const {error} = schema.validate(newArticle, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message));
  }

  return next();
};

