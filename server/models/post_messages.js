'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post_messages.init(
    {
      post_id: DataTypes.INTEGER,
      message_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'post_messages',
    }
  );
  return post_messages;
};
