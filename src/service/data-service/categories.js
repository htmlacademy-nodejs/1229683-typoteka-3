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
        group: [Sequelize.col(`Category.id`)],
        include: [{
          model: this._ArticlesCategories,
          attributes: [],
        }]
      });

      return result.map((it) => it.get());
    }
    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoryService;
