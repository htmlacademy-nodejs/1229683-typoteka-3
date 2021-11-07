"use strict";


class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.article;
    this._Comment = sequelize.models.comment;
    this._Category = sequelize.models.сategory;
    this._User = sequelize.models.user;
  }

  async create(articleData) {
    const article = await this._Article.create(articleData);
    await article.addCategories(articleData.categories);
    const newArticle = await this._Article.findByPk(article.get().id, {include: `categories`});
    return newArticle;
  }

  async findAll(isNeedComments) {
    const include = [`categories`,
      {
        model: this._User,
        attributes: {
          exclude: [`passwordHash`]
        }
      }];

    if (isNeedComments) {
      include.push({
        model: this._Comment,
        include: [
          {
            model: this._User,
            attributes: {
              exclude: [`passwordHash`]
            }
          }
        ]
      });
    }

    const articles = await this._Article.findAll({
      include,
      subQuery: false,
      order: [
        [`createdAt`, `DESC`]
      ]
    });

    return articles.map((item) => item.get());
  }

  findOne(id) {
    return this._Article.findByPk(id, {include: [`categories`, {
      model: this._Comment,
      include: [
        {
          model: this._User,
          attributes: {
            exclude: [`passwordHash`, `email`]
          }
        }
      ]
    }, {
      model: this._User,
      attributes: {
        exclude: [`passwordHash`]
      }
    }]});
  }

  async findPage({limit, offset, isNeedComments}) {
    const include = [`categories`, {
      model: this._User,
      attributes: {
        exclude: [`passwordHash`]
      }
    }];

    if (isNeedComments) {
      include.push(`comments`);
    }

    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include,
      distinct: true
    });
    return {count, articles: rows};
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

    const updatedArticle = await this._Article.findOne({
      where: {
        id,
      }
    });

    await updatedArticle.setCategories(article.categories);
    return !!affectedRows;

  }
}

module.exports = ArticleService;
