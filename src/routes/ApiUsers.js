const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/ApiUsersController');
const controllerProducts = require('../controller/ApiProductsController');


//Rutas a Api de Usuarios//
router.get('/users', controllerUser.list);
router.get('/users/:id', controllerUser.detail);

//Rutas a Api de Productos//
router.get('/products', controllerProducts.list);
router.get('/products/:id', controllerProducts.detail);





module.exports = router;