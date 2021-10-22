const express = require('express');
const router = express.Router();
const path=require('path');
const controller = require('../controller/productsController')
const multer = require('multer');

/* Configuracion de multer */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img/productos'));
    },
    filename: function (req, file, cb) {
        const name = `product-${Date.now()}${path.extname(file.originalname)}`
        cb(null, name)
    }
})
const upload = multer({ storage })

router.get('/', controller.mostrarProductos); 

router.get("/detail", controller.detallar); 


router.get("/createproduct", controller.create);
router.post('/', upload.single('image'), controller.store); //Ruta que guarda
router.get("/editproduct", controller.edit);



/*carrito*/
router.get('/cart',controller.comprar);




module.exports=router; 