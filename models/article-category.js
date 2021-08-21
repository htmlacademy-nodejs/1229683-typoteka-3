'use strict';
const {
  Model
} = require(`sequelize`);
module.exports = (sequelize) => {
  class ArticleCategory extends Model {
    static associate() {

    }
  }
  ArticleCategory.init({
  }, {
    sequelize,
    modelName: `articlesCategories`,
    timestamps: false,
  });
  return ArticleCategory;
};
