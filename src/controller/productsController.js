const path=require('path');
const fs = require('fs'); 

/* Logica para traer los productos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
let products = JSON.parse(jsonProducts); //Convertimos el json a array

const nuevoId = () => {
    let ultimo = 0;
    products.forEach(product => {
        if (product.id > ultimo) {
            ultimo = product.id;
        }
    });
    return ultimo + 1;
}

let controller = {
    mostrarProductos:  (req,res)=> {
       let mostrar=[];
       products.forEach(product =>{
           mostrar.push(product);
       });
       res.render('products',{mostrar});
    },

       
        
    

    detallar: function (req, res) { 
        res.render('detail');
        
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
    store (req, res) {
        // Creamos el producto base
        let product = {
            id: nuevoId(),
            ...req.body,
             image: req.file.filename || 'default-image.png',
        }
        // Agregamos el nuevo producto
        products.push(product);

        // Pasamos a json todos los productos y sobreescribimos la db
        let jsonDeProductos = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), jsonDeProductos);

        res.redirect('/');
    },

};
module.exports = controller;