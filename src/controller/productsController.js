const path=require('path');

let controller = {
    products:  (req,res)=> {
        res.render('productos');
        
    },
    detallar: function (req, res) { 
        res.render('productodetalle');
        
    },
    comprar: (req,res) => {
        res.render('cart');

    },
    create: (req,res) => {
        res.render('createproduct');
    },
    edit: (req,res) => {
        res.render('editproduct');
    },

};
module.exports = controller;