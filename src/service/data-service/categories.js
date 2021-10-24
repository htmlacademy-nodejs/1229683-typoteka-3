"use strict";

const Sequelize = require(`sequelize`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.category;
    this._ArticlesCategories = sequelize.models.articlesCategories;
    this._Article = sequelize.models.article;
  }

  async findAll(needCount) {
    if (needCount) {
      const result = await this._Category.findAll({
        attributes: [
          `id`,
          `title`,
          [Sequelize.fn(
              `COUNT`,
              `*`
          ),
          `count`
          ]
        ],
        group: [Sequelize.col(`category.id`)],
        include: [{
          model: this._ArticlesCategories,
          as: `articlesCategories`,
          attributes: [],
        }]
      });

      return result.map((it) => it.get());
    }
    return this._Category.findAll({raw: true});
  }

  async findOne(id) {
    return this._Category.findByPk(id);
  }

  async findPage(id, limit, offset) {
    const articlesIdByCategory = await this._ArticlesCategories.findAll({
      attributes: [`articleId`],
      where: {
        categoryId: id
      },
      raw: true
    });

    const articlesId = articlesIdByCategory.map((articleId) => articleId.articleId);


    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [
        `categories`,
        `comments`,
      ],
      order: [
        [`createdAt`, `DESC`]
      ],
      where: {
        id: articlesId
      },
      distinct: true
    });


    return {count, articlesByCategory: rows};
  }
}

module.exports = CategoryService;
