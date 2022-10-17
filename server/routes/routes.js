const express = require('express');
const router = express.Router();
const {authentication} = require('../middlewares/auth.js')
const user_routes = require('./folder_routes/user_route.js')
const product_routes = require('./folder_routes/product_route.js')
const category_routes = require('./folder_routes/category_route.js')




// REST API 
// plural + tidak ada kata kerja

// POST /register 

router.use('/users',user_routes)
router.use('/products',product_routes)
router.use('/categories',category_routes)





module.exports = router;