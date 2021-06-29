'use strict';
const {
  Model
} = require(`sequelize`);
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Article, {
        foreignKey: `articleId`,
      });
      Comment.belongsTo(models.User, {
        foreignKey: `userId`,
      });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: `Comment`,
  });
  return Comment;
};
