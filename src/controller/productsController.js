const path=require('path');
const fs = require('fs'); 
const { validationResult } = require('express-validator');

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
    inventory:  (req,res)=> {
       let inventory=[];
       products.forEach(product =>{
           inventory.push(product);
       });
       res.render('inventory',{inventory});
    },      
    
    mostrarProductos:  (req,res)=> {
        let mostrar=[];
        products.forEach(product =>{
            mostrar.push(product);
        });
        res.render('products',{mostrar});
     },
     decoracion:  (req,res)=> {       
        let mostrar=[];
        products.forEach(product =>{
            if(product.category.indexOf("decoracion")!=-1){ // recorre el array de productos, y trae lo que este en categoria, y lo pushea
            mostrar.push(product); // uso indexOf porque la categoria puede tener mas de una.
            }
        });               
        res.render('products',{mostrar}); 
        },
    usopersonal:  (req,res)=> {       
        let mostrar=[];
        products.forEach(product =>{
            if(product.category.indexOf("uso-personal")!=-1){
            mostrar.push(product);
            }
        });               
        res.render('products',{mostrar}); 
        },
     muebles:  (req,res)=> {       
            let mostrar=[];
            products.forEach(product =>{
                if(product.category.indexOf("muebles")!=-1){
                mostrar.push(product);
                }
            });               
            res.render('products',{mostrar}); 
            },
    
    viajes:  (req,res)=> {       
         let mostrar=[];
        products.forEach(product =>{
            if(product.category.indexOf("viaje")!=-1){
            mostrar.push(product);
            }
        });               
        res.render('products',{mostrar}); 
        },

    detallar: function (req, res) { 
        let id = req.params.id;
        
        let productoMuestra = products.find(product => {
            return product.id == id;
        })
        res.render('detail', {product: productoMuestra});
        

    
    },
    comprar: (req,res) => {
        res.render('cart');

    },
    create: (req,res) => {
        res.render('createproduct');
    },
    edit: (req,res) => {
        let id = req.params.id;
        
        let productoActualizar = products.find(product => {
            return product.id == id;
        })
        res.render('editproduct', {product: productoActualizar});

    },

    update:(req,res) => {
        // Editamos el producto buscandolo con una condición
        products.forEach(product => {
            if (product.id == req.params.id) {
                product.name = req.body.name;
                product.description = req.body.description;
                product.price = req.body.price;
                product.category = req.body.category;
                product.origin = req.body.origin;
                product.material = req.body.material;
                product.color = req.body.color;
                product.measurements = req.body.measurements;
                product.image = req.file == undefined ? 'img-default.jpeg' : req.file.filename;
            }
        })

        // let productToEdit = products.find(product => {
        //     return product.id == req.params.id;
        // })
        // productToEdit.name = req.body.name;

        // Pasamos a json todos los productos y sobreescribimos la db
        let jsonDeProductos = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), jsonDeProductos);

        res.redirect('/');


    
    },
    store (req, res) {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
			return res.render('createproduct', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        // Creamos el producto base
        let product = {
            id: nuevoId(),
            ...req.body,
            //category:[req.body.category],
             image: req.file.filename || 'img-default.jpeg',
        }
        // Agregamos el nuevo producto
        products.push(product);

        // Pasamos a json todos los productos y sobreescribimos la db
        let jsonDeProductos = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), jsonDeProductos);

        res.redirect('/');
    },

    delete (req, res) {

        let productosRestantes = products.filter(product => {
            return product.id != req.params.id;
        })

        let borrarimagen = products.filter(product => {
            return product.id == req.params.id; // me guarda la info del producto a borrar
        })
        
        fs.unlinkSync('../public/img/productos/'+borrarimagen[0].image); // devuelve el nombre del archivo, me borra la imagen del producto

        let jsonDeProductos = JSON.stringify(productosRestantes, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), jsonDeProductos);

        res.redirect('/');
    }

};
module.exports = controller;