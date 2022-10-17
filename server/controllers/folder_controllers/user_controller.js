const db = require ("../../models");
const { user , Log} = require ("../../models");
const { checkPassword } = require('../../helpers/bcrypt')
const { generateToken, verifyToken } = require('../../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
//nama harus sesuai nama tabel Sec User

class user_controller{

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
    user.findAll()
      .then(data=>{
        user_controller.createLog("user",0,"findAll")
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static create(req,res,next){
    console.log('masuk create userd')
    let {
      username,
      email,
      password,
      phoneNumber,
      address
    } = req.body

    user.create({
      username,
      email,
      password,
      role: "admin",
      phoneNumber,
      address})

    .then(data=>{
      user_controller.createLog("user",data.id,"create")
      res.status(200).json({username,email,role:"admin",phoneNumber,address})
    })
    .catch(err=>{
      next(err)
    })
  }

  static login(req,res,next){
    const {username, password} = req.body
    if (!username || !password){
      throw {"name":"username / password required"}
    }
    console.log(password)

    user.findOne({where: { username }})
    .then(data=>{
      if(data){
        let compare = checkPassword(password, data.password)
        console.log(compare)
        if(compare){
          
          let payload = { id: data.id, username: data.username}
          let access_token = generateToken(payload)
        
          console.log(access_token)
          user_controller.createLog("user",data.id,"login")
          res.status(200).json({access_token,username,role:data.role})
        }
        else{
          console.log('invalid password')
          throw ({name: 'Invalid Password'})
        }
      } 
      else{
        console.log('invalid username')
        throw ({name: 'Invalid Username'})
      }
    })
    .catch(err=>{
      next(err)
    })
  }
  
  static async googleSignUpIn (req, res, next) {
    const {google_token} = req.headers
    const client = new OAuth2Client("897436887545-sb656h5m1s31isp67i2tu0vui9jeu48f.apps.googleusercontent.com");
    
    client.verifyIdToken({
        idToken: google_token,
        audience: "897436887545-sb656h5m1s31isp67i2tu0vui9jeu48f.apps.googleusercontent.com",
    })

    .then ((data) =>{
      console.log('sampe sini inih')
      const payload = data.getPayload()
      return user.findOrCreate({
        where:{
            email: payload.email,
        }, 
        defaults: {
          username : payload.given_name + '_' + payload.family_name,
          email : payload.email,
          password : 'google_oauth2' + payload.given_name + '_' + payload.family_name,
          phoneNumber :'000',
          role:'staff',
          address : 'A'
  
        },
      })
    })

    .then((userResult, created)=>{
      console.log("USER RESULT" ,userResult[0].dataValues)
      if (created){

      }
      return user.findOne({where: { username : userResult[0].dataValues.username }})
    })

    .then(data=>{
      let payload = { id: data.id, username: data.username}
      let access_token = generateToken(payload)

      console.log(({access_token,username:data.username,role:data.role}))
      user_controller.createLog("user",data.id,"login_google")
      res.status(200).json({access_token,username:data.username,role:data.role})
    })

    .catch((err)=>{
      console.log('error user controller')
      console.log(err)
    })
  }

  static update (req, res, next) {
    user.update(
      {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
      },
      {where: req.params.userId}
    )
    .then(data=> {
      user_controller.createLog("user",data.id,"update")
      res.status(200).json(data)
    })
    .catch(next)
  }

  static delete (req, res, next){
    user.destroy({ where: { id: req.params.userId } })
    .then(data=>{
      user_controller.createLog("user",req.params.userId,"delete")
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = user_controller;