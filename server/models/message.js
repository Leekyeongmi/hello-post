'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Post);
    }
  }
  Message.init(
    {
      content: DataTypes.STRING,
      writer: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Message',
    }
  );
  return Message;
};
