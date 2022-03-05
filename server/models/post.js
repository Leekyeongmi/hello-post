'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      Post.hasMany(models.Message, {
        foreignKey: 'post_id',
        sourceKey: 'id',
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
