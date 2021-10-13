"use strict";

class CommentService {
  constructor(sequelize) {
    this._Article = sequelize.models.article;
    this._Comment = sequelize.models.comment;
    this._User = sequelize.models.user;
  }

  async findAll(articleId) {
    return this._Comment.findAll({
      where: {articleId},
      include: [{
        model: this._User,
        attributes: {
          exclude: [`passwordHash`]
        }
      }],
      raw: true,
    });
  }

  async drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  async create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment
    });
  }
}

module.exports = CommentService;
