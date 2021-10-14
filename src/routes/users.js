const express = require('express');
const router = express.Router();
const controller = require('../controller/usersController')

const path=require('path');


/*Register*/
router.get('/register', controller.register);

router.post('/register', (req,res)=> {
    res.send('Ya te registraste');
});
    
/*Login*/
router.get('/login',controller.login);


router.post("/login",(req,res)=>{
    res.send('Ya te logueaste');
});






module.exports=router; 