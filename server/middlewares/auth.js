const jwt = require('jsonwebtoken')
const secretKey= "KeyBoardWarrior"
const db = require('../models')
const {user} = require('../models')



async function authentication (req,res,next){
    try{
        const access_token = req.headers.access_token
        console.log(access_token,'masuk authentikasi')
        if (!access_token){
            throw  {"name":"access_token null"}
        }
        const decoded = jwt.verify(access_token,secretKey)

        const findUser = await user.findByPk(decoded.id)

        if(!findUser){
            throw  {"name":"user null"}
        }

        req.userData = decoded

        next()
    }
    catch(err){
        next(err)
    }
}

module.exports={authentication}
