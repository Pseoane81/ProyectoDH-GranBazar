const express = require('express');
const router = express.Router();
const controller = require('../controller/ApiUsersController');


router.get('/list', controller.list);
router.get('/list/:id', controller.detail);



module.exports = router;