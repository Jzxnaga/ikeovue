const db = require ("../../models");
const { category , Log} = require ("../../models");
const { generateToken, verifyToken } = require('../../helpers/jwt')
//nama harus sesuai nama tabel Sec User

// PascalCase 
class category_controller{

  static createLog (table,target_id,action){
    Log.create({table,target_id,action})
    .then(data=>{
      return
    })
    .catch(err =>{
      next(err)
    })
  }
  
  static findAll(req,res,next){
    category.findAll()
      .then(data=>{
        category_controller.createLog("category",0,"findAll")
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static create(req,res,next){
    let {
      name
    } = req.body
    category.create(req.body)
    .then(data=>{
      category_controller.createLog("category",data.id,"create")
      res.status(200).json(data)
      
    })
    .catch(err=>{
      next(err)
    })
  }

  static update (req, res, next) {
    category.update(
      {name: req.body.name},
      {where: req.params.id}
    )
    .then(data=> {
      category_controller.createLog("category",data.id,"update")
      res.status(200).json(data)
    })
    .catch(next)
  }

  static delete (req, res, next){
    category.destroy({ where: { id: req.params.id } })
    .then(data=>{
      category_controller.createLog("category",req.params.id,"delete")
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = category_controller;