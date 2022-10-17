const express = require('express');
const router = express.Router();
const product_controller = require('../../controllers/folder_controllers/product_controller.js')
const {authentication} = require('../../middlewares/auth.js')

router.get('/',authentication,product_controller.findAll)
router.post('/',authentication,product_controller.create)
router.get('/:id',authentication,product_controller.findOne)
router.put('/:id',authentication,product_controller.update)
router.delete('/:id',authentication,product_controller.delete)

module.exports = router;
