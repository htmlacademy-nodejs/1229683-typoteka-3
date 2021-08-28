"use strict";

const Sequelize = require(`sequelize`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.category;
    this._ArticlesCategories = sequelize.models.articlesCategories;
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
}

module.exports = CategoryService;
