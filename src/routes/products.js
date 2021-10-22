const express = require('express');
const router = express.Router();
const path=require('path');
const controller = require('../controller/productsController')

router.get('/', controller.products); 

router.get("/detail", controller.detallar); 


router.get("/createproduct", controller.create);
router.get("/editproduct", controller.edit);



/*carrito*/
router.get('/cart',controller.comprar);




module.exports=router; 