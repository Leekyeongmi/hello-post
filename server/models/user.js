'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Post);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'User',
    }
  );
  return User;
};
