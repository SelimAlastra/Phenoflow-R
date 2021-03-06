'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.post , {foreignKey: 'postId'})
    }
  }
  answer.init({
    content: {type : DataTypes.STRING, allowNull : false},
    author: {type : DataTypes.STRING, allowNull : false},
    verifiedAuthor: {type: DataTypes.BOOLEAN, allowNull: false}
  }, {
    sequelize,
    modelName: 'answer',
  });
  return answer;
};