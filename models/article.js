'use strict';
const {
  Model
} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {

    static associate(models) {
      Article.hasMany(models.Comment, {
        foreignKey: `commentId`,
      });
      Article.belongsToMany(models.Category, {through: `ArticlesCategories`});
      Article.belongsTo(models.User, {foreignKey: `userId`});
    }
  }
  Article.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    announce: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `Article`,
    timestamps: true,
    paranoid: true,
  });
  return Article;
};
