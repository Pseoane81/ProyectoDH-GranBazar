const express = require('express');
const router = express.Router();
const path=require('path');
const controller = require('../controller/productsController')

router.get("/productos", controller.products); 

router.get("/productodetalle", controller.detallar); 


router.get("/createproduct", controller.create);
router.get("/editproduct", controller.edit);






module.exports=router; 