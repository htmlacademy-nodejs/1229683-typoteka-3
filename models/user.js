'use strict';
const {
  Model
} = require(`sequelize`);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Comment, {foreignKey: `userId`});
      User.hasMany(models.Article, {foreignKey: `userId`});
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastName: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avatar: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: `User`,
  });
  return User;
};
