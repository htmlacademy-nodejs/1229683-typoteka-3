'use strict';
const {
  Model
} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {

    static associate(models) {
      Article.hasMany(models.comment, {
        foreignKey: `commentId`,
      });
      Article.belongsToMany(models.category, {through: `articlesCategories`});
      Article.belongsTo(models.user, {foreignKey: `userId`});
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
    modelName: `article`,
  });
  return Article;
};
