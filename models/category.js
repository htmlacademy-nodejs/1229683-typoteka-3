"use strict";
const {Model} = require(`sequelize`);
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.article, {through: `articlesCategories`});
    }
  }
  Category.init(
      {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        title: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: `category`,
        timestamps: false,
      }
  );
  return Category;
};
