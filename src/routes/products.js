const express = require('express');
const router = express.Router();
const path=require('path');
const controller = require('../controller/productsController')
const multer = require('multer');
const validation=require ('../middleware/validatorProductsMiddleware');
const validationUpate=require ('../middleware/validatorProductsUpdateMiddleware');

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

/* proceso datos */
router.post('/favoritos/:id',controller.favoritosGuardar);
router.post('/', upload.single('image'),validation, controller.store); //Ruta que crea y guarda
router.put("/editproduct/:id",upload.single('image'),validationUpate, controller.update); //Edita productos?
router.delete("/:id", controller.delete); // Ruta que elimina el producto


/*envio de vistas*/
router.get('/', controller.mostrarProductos); // Te lleva a la vista de todos los productos
router.get('/favoritos', controller.favoritos);

router.get('/all', controller.allproducts);
router.get("/busqueda", controller.busqueda); // busqueda
router.get('/decoracion', controller.decoracion); // Te lleva a la vista DECORACION
router.get('/usopersonal', controller.usopersonal); // Te lleva a la vista USO PERSONAL
router.get('/viajes', controller.viajes); // Te lleva a la vista VIAJES
router.get('/muebles', controller.muebles); // Te lleva a la vista muebles

router.get('/cart',controller.comprar);
router.get('/inventory', controller.inventory); // Te lleva a la vista de todos los productos
router.get("/createproduct", controller.create); // Vista de crear
router.get("/editproduct/:id", controller.edit); //vista de editar

router.get("/:id", controller.detallar); // Muestra detalle de producto





router.get('/cart',controller.comprar);




module.exports=router; 