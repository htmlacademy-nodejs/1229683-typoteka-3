"use strict";


class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.article;
    this._Comment = sequelize.models.comment;
    this._Category = sequelize.models.сategory;
  }

  async create(articleData) {
    const article = await this._Article.create(articleData);
    await article.addCategories(articleData.categories);
    return article.get();
  }

  async findAll(isNeedComments) {
    const include = [`categories`];

    if (isNeedComments) {
      include.push(`comments`);
    }

    const articles = await this._Article.findAll({
      include,
      subQuery: false
    });

    return articles.map((item) => item.get());
  }

  findOne(id) {
    return this._Article.findByPk(id, {include: `categories`});
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });

    return !!deletedRows;
  }

  async update(id, article) {
    const [affectedRows] = await this._Article.update(article, {
      where: {id}
    });
    return !!affectedRows;

  }
}

module.exports = ArticleService;
