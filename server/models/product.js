'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes/routes');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.user,{foreignKey: 'authorId'})
      product.belongsTo(models.category,{foreignKey: 'categoryId'})
    }
  }
  product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'Name is required'},
        notEmpty:{msg : 'Name is required'}
      }
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:{
          args:1,
          msg:"stock cannot be less than 1"
        },
        max:{
          args:999999999,
          msg:"stock cannot be more than 999.999.999"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:"stock cannot be less than 1"
        },
        max:{
          args:999,
          msg:"stock cannot be less than 999"
        },
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    hooks:{
      // beforeCreate(product,options) {
      //   if(product.stock<0 || product.stock>999){
      //     throw  {"name":"product stock can't be below 0 or more than 999"}
      //   }
      // },
    
      // beforeUpdate(product,options) {
      //   if(product.stock<0 || product.stock>999){
      //     throw  {"name":"product stock can't be below 0 or more than 999"}
      //   }
      // },

      // beforeCreate(product,options) {
      //   if(product.price<10 || product.price>99999999){
      //     throw  {"name":"product price can't be below 10 or more than 99999999"}
      //   }
      // },
    
      // beforeUpdate(product,options) {
      //   if(product.price<0 || product.price>99999999){
      //     throw  {"name":"product price can't be below 10 or more than 99999999"}
      //   }
      // }
    },
    sequelize,
    modelName: 'product',
  });

  return product;
};