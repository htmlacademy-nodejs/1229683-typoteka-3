'use strict';
const {
  Model
} = require(`sequelize`);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.comment, {foreignKey: `userId`});
      User.hasMany(models.article, {foreignKey: `userId`});
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
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
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: `user`,
  });
  return User;
};
