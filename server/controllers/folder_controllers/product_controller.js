const db = require ("../../models");
const { product , user , category , Log} = require ("../../models");
const { generateToken, verifyToken } = require('../../helpers/jwt')
//nama harus sesuai nama tabel Sec User

class product_controller{

  static createLog (table,target_id,action){
    Log.create({table,target_id,action})
    .then(data=>{
      return
    })
    .catch(err =>{
      next(err)
    })
  }


  static async findAll(req,res,next){
    product.findAll({include: [{ model: user , attributes:['username','email']}, {model: category} ]})
      .then(data=>{
        product_controller.createLog("product",0,"findAll")
        console.log(req.userData)
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static async findOne(req,res,next){
    product.findByPk(req.params.id,{include: [{ model: user , attributes:['username','email']}, {model: category} ]})
      .then(data=>{
        product_controller.createLog("product",req.params.id,"findone")
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static async create(req,res,next){
    let body = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      imgUrl: req.body.imgUrl,
      categoryId: req.body.categoryId,
      authorId: req.userData.id
    }
    category.findByPk(req.body.categoryId)
    .then(oneCategory=>{
      if(oneCategory){
        return product.create(body)
      }else{
        throw{"name":"no id category found"}
      }
    })
    .then(data=>{
      product_controller.createLog("product",data.id,"create")
      res.status(200).json(data)
    })
    .catch(err=>{
      console.log('err.name')
      next(err)
    })
  }

  static async update (req, res, next) {
    if(req.userData.id == req.body.authorId){
      product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        authorId: req.userData.id
      },
      {where: req.params.id}
      )
        .then(data=> {
        product_controller.createLog("product",data.id,"update")
        res.status(200).json(data)
      })
      .catch(next)
    }else{
      throw ({name:'unauthorized to change someone else product'})
    }
  }

  static async delete (req, res, next){
    console.log('try to delete')
    product.destroy({ where: { id: req.params.id } })
    .then(data=>{
      product_controller.createLog("product",req.params.id,"delete")
      res.status(200).json({"message": "product has been deleted"})
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = product_controller;