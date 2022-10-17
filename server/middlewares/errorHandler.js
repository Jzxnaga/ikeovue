const e = require("express");

function errorHandler (err , req , res , next){
//   let statuscode = 500
  let errorCode = "UNKNOWN ERROR"
  let path = ''

  console.log(err,'masuk middleware error');
  //res.status(500).json({msg : "Internal server errpr"})

  //400
  //SequelizeValidationError & Sequelize
  //Validasi model
  //Username password --> login
  //400"message": "username / password required"

  if(err.name == 'Invalid Username'){
    console.log('masuk else')
    errorCode = 500
    message = err.name
    res.status(500).json({errorCode,message})
  }

  else if(err.name == "username / password required"){
    errorCode = 400;
    message = err.name
    res.status(errorCode).json({errorCode,message});
  }

  else if (err.name == "access_token null"){
    errorCode = 401;
    message = err.name
    res.status(errorCode).json({errorCode,message});
  }

  else if (err.name == "JsonWebTokenError" || err.name == "user null"){
    errorCode = 401;
    message = "Invalid Token"
    res.status(errorCode).json({errorCode,message});
  }

  if(err.name == "Invalid Password"){
    errorCode = 401
    message = err.name
    res.status(errorCode).json({errorCode,message})
  }

  else if (err.name = "SequelizeValidationError"){
    errorCode = 400
    message = err.errors[0].message
    res.status(errorCode).json({errorCode,message})
  }

  else if (err.name == 'Invalid Username'){
    console.log('masuk else')
    errorCode = 500
    message = err.name
    res.status(500).json({errorCode,message})
  }

  else{
    console.log('masuk else')
    errorCode = 500
    message = err.name
    res.status(500).json({errorCode,message})
  }

  //401
  // "name":"access_token null" , "name":"user null", "JsonWebTokenError"
  // INVALID_PASSWORD
  
//   if(err.message.split('').splice(0,10).join('')=='Validation'){
    
//       console.log('masuk error validation');
//       errorCode = 400;
//       message = err.errors[0].message;
//       res.status(errorCode).json({errorCode,message});
//       console.log(message);
//   } else if (err.message.split('').splice(0,5).join('')=='WHERE'){
//       errorCode = 402;
//       message = err.message;
//       res.status(errorCode).json({errorCode,message});
//       console.log(err.message)
//   } else {
//       errorCode = 403;
//       message = err.message;
//       res.status(errorCode).json({errorCode,message});
//       console.log(err.message)
//   }
  

  //400 error bad request validasi
  //401 unauthorized -- ini tidak ada token
  //403 forbiden authentication - hak akses
  // res.status(statuscode).json(`${errorCode} in ${path}, ${msg}`)
  
}

module.exports = errorHandler;