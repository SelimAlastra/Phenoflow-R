'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.answer, {foreignKey: 'postId', onDelete:'CASCADE', hooks:true})
    }
  }
  post.init({
    title: {type : DataTypes.STRING, allowNull : false},
    question: {type : DataTypes.STRING, allowNull : false},
    author: {type : DataTypes.STRING, allowNull : false}
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};