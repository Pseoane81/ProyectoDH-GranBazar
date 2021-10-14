const express=require('express');
const router = express.Router();
const path=require('path');
const controller = require('../controller/productsController');

/*carrito*/
router.get('/cart',controller.comprar);

/*carrito vacio*/
router.get('/empty-cart',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../views/empty-cart.html"))
});


module.exports=router; 