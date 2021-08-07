'use strict';
const {
  Model
} = require(`sequelize`);
module.exports = (sequelize, DataTypes) => {
  class ArticleCategory extends Model {
    static associate(models) {
      ArticleCategory.belongsTo(models.article);
      ArticleCategory.belongsTo(models.category);

    }
  }
  ArticleCategory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: `articlesCategories`,
    timestamps: false,
  });
  return ArticleCategory;
};
