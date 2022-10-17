'use strict';

const { generatePassword } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    address: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(body){
        body.password = generatePassword(body.password)
      }
    },
    sequelize,
    modelName: 'user',
  });

  user.associate = function(models){
    user.hasMany(models.product, {foreignKey : 'authorId'});
  }


  return user;
};