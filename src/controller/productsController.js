const path=require('path');
const fs = require('fs'); 
const { validationResult, body } = require('express-validator');
const db = require ('../database/models')
const { Sequelize } = require('../database/models');
const { Op } = require('sequelize');
const sequelize = require("sequelize");

let controller = {
    inventory:  (req,res)=> {
        db.Product.findAll()
         .then(function(inventory){
             res.render('inventory',{inventory})
         })    
     },     
    
    mostrarProductos:  (req,res)=> {
        db.Product.findAll()
        .then(function(mostrar){
            res.render('inventory',{mostrar})
        })
     },

     decoracion:  (req,res)=> {       
        db.Category.findOne( 
            {where: { id:6}, 
            include: [{association:"products"}]}) 
        .then(function(mostrar){
            res.render('products',{mostrar:mostrar.products})
        })
        },

    usopersonal:  (req,res)=> {       
        db.Category.findOne( 
            {where: { id:4}, 
            include: [{association:"products"}]}) 
        .then(function(mostrar){
            res.render('products',{mostrar:mostrar.products})
        })
        },

     muebles:  (req,res)=> {       
        db.Category.findOne( 
            {where: { id:1}, 
            include: [{association:"products"}]}) 
        .then(function(mostrar){
            res.render('products',{mostrar:mostrar.products})
        })
        },
    
    viajes:  (req,res)=> {       
        db.Category.findOne( 
            {where: { id:3}, 
            include: [{association:"products"}]}) 
        .then(function(mostrar){
            res.render('products',{mostrar:mostrar.products})
        })
        },

    detallar: function (req, res) { 
        let colores = db.Color.findAll()
        let mostrarlo = db.Product.findAll()

        let productos = db.Product.findByPk(req.params.id, {
           include: ["colors", "materials", "Country"]
           /*[{association:"colors"},{association:"materials"},{association:"Country"}]*/
        })
        Promise.all([productos,mostrarlo, colores])
         .then(function([product,mostrar, colors]){
           res.render('detail', {product: product,mostrar,colors});
           /*res.send(product)*/
         })
    },

    comprar: (req,res) => {
        res.render('cart');

    },
    create: (req,res) => {
        let categoria = db.Category.findAll()
        let color =db.Color.findAll()
        let country =db.Country.findAll()
        let material =db.Material.findAll()
        Promise.all([color,categoria,country,material])
            .then(function([color,categoria,country,material]){
               return res.render('createproduct',{Colors:color,Categoria:categoria,Country:country,Material:material});
               
            }).catch(error => console.log(error));
    },
    edit: (req,res) => {
        let pedidoproducto = db.Product.findByPk(req.params.id)
        let categoria = db.Category.findAll()
        let color =db.Color.findAll()
        let country =db.Country.findAll()
        let material =db.Material.findAll()
            Promise.all([pedidoproducto,color,categoria,country,material])
                .then(function([product,color,categoria,country,material]){ 
                    res.render('editproduct', {product,color,categoria,country,material});
        
        }).catch(error => console.log(error));
    },

    update:(req,res) => {
        // Editamos el producto buscandolo con una condición
        let productoid = req.params.id
        db.Product.update({
            name:req.body.name,
            description:req.body.description,
            measure: req.body.measurements,
            price:req.body.price,
            img:req.file.filename || 'img-default.jpeg',
            country_id:req.body.origin,
            material_id:req.body.material, 
            }, {
                where: {
                    id: productoid
                }
            })
            .then(function(productocreado){
                db.ProductColor.update({
                    color_id:req.body.color,
                    
                },
                {
                    where: {
                        product_id: productoid
                            }
                })
                db.ProductCategory.update({
                    category_id:req.body.category,
                    
                
            },
            {
                where: {
                    product_id: productoid
                        }
            }
            ).catch(error => console.log(error));          
            })
            
        res.redirect('/');
    },

    store: (req, res) => {
        let resultValidation = validationResult(req);console.log(resultValidation)
        if (resultValidation.isEmpty() ) {
            db.Product.create({
                name:req.body.name,
                description:req.body.description,
                measure: req.body.measurements,
                price:req.body.price,
                img:req.file.filename || 'img-default.jpeg',
                country_id:req.body.origin,
                material_id:req.body.material, 
                })
                .then(function(productocreado){
                    if (req.body.color.length > 1){
                    req.body.color.forEach(color=>{
                        db.ProductColor.create({
                            color_id:color,
                            product_id:productocreado.id
                    }) 
                    })
                } else {
                    db.ProductColor.create({
                        color_id:req.body.color,
                        product_id:productocreado.id
                    })
                    }

                    if (req.body.category.length > 1){
                    req.body.category.forEach (category => {
                    db.ProductCategory.create({
                        category_id:category,
                        product_id:productocreado.id
                    })
                })
            }  else {
                db.ProductCategory.create({
                    category_id:req.body.category,
                    product_id:productocreado.id
                })
                }         
                }).catch(error => console.log(error)); 
                
                
            res.redirect('/');
        }else {
            let categoria = db.Category.findAll()
            let color =db.Color.findAll()
            let country =db.Country.findAll()
            let material =db.Material.findAll()
                Promise.all([color,categoria,country,material])
                    .then(function([color,categoria,country,material]){
			            return res.render('createproduct', {
			            	errors: resultValidation.mapped(),
			            	oldData: req.body,
                            Colors:color,
                            Categoria:categoria,
                            Country:country,
                            Material:material
                        })
            }).catch(error => console.log(error));
		
        }
        
    },

    delete (req, res) {

        db.ProductColor.destroy({
            where: {
                product_id: req.params.id
            }
        })
        
        db.ProductCategory.destroy({
            where: {
                product_id: req.params.id
            }
        })

        .then(function(borrado) {
            db.Product.destroy({
                where: {
                    id:req.params.id
                }
        }) 
        })
        .catch(error => console.log(error));    
        res.redirect('/');
    },
    busqueda: (req, res) => {
                
        db.Product.findAll({       
            order: [['id', 'ASC']], 
            where: { name : sequelize.where(sequelize.fn('LOWER', sequelize.col('Product.name')), 'LIKE', `%${req.query.search}%`) } 
        })
        .then(function(mostrar){ 
        if (mostrar.length > 0) {
            res.render("busqueda", { mostrar, notfound: false });
        } else {
            res.render("busqueda", {notfound:true })
               }
    }).catch(error => console.log(error));    

}

};
module.exports = controller;