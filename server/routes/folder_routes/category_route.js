const express = require('express');
const router = express.Router();
const category_controller = require('../../controllers/folder_controllers/category_controller.js')
const {authentication} = require('../../middlewares/auth.js')

router.get('/',category_controller.findAll)
router.post('/',category_controller.create)
router.put('/:id',authentication,category_controller.update)
router.delete('/:id',authentication,category_controller.delete)


module.exports = router;