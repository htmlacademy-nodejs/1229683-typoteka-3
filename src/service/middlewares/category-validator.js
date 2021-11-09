'use strict';

const Joi = require(`joi`);

const {HttpCode} = require(`../../constants`);

const ErrorCommentMessage = {
  MIN: `Название категории должно содержать больше 5 символов`,
  MAX: `Название категории должно содержать меньше 30 символов`,
};

const schema = Joi.object({
  category: Joi.string().min(5).max(30).required().messages({
    'string.min': ErrorCommentMessage.MIN,
    'string.max': ErrorCommentMessage.MAX
  })
});

module.exports = (req, res, next) => {
  const category = req.body;

  const {error} = schema.validate(category);

  if (error) {
    throw res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
