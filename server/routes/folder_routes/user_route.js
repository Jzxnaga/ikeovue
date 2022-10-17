const express = require('express');
const router = express.Router();
const user_controller = require('../../controllers/folder_controllers/user_controller.js')
const {authentication} = require('../../middlewares/auth.js')

router.get('/',user_controller.findAll)
router.post('/signUp',user_controller.create)
router.post('/signIn',user_controller.login)
router.put('/',authentication,user_controller.update)
router.delete('/',authentication,user_controller.delete)
router.get('/gsign',user_controller.googleSignUpIn)

// router.post('/login',sec_user_controller.login)

module.exports = router;

