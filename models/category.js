'use strict';
const {
  Model
} = require(`sequelize`);
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Article, {through: `ArticlesCategories`});
    }
  }
  Category.init({
    id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: `Category`,
  });
  return Category;
};
