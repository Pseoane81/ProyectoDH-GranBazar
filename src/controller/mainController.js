const path = require('path');
const fs = require('fs');

/* Logica para traer los productos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
let products = JSON.parse(jsonProducts); //Convertimos el json a array

let controller = {
    home: (req,res) => {
        let destacados=[];
       products.filter(product =>{
           if (product.category == 'destacados') {
               destacados.push(product);
           }
       });
       
       res.render('home',{destacados});

    },
    about: (req,res) => {
        res.render('about');
    }
}

module.exports = controller;
