'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Message);
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
