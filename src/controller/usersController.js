const path=require('path');
const {validationResult, body}=require('express-validator');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require ('../database/models') // creo q esta ruta pisaria a la de arriba a la hora de quitar el CRUD con JSON
const { Sequelize } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    register:  (req,res)=> {
        
        res.render('users/register')
        
    },
    processRegister:(req,res)=>{
        const resultValidation=validationResult(req); 
           
    
         if(resultValidation.errors.length > 0){
            res.render('register',{
                errors:resultValidation.mapped(),
                oldData:req.body
            });
         }
         
         db.User.findOne({where: 
            
                {email:req.body.email}})
         
                .then((userInDB) => {
                    if (userInDB) {
                       return res.render("users/register", {
                           errors: {
                               email: {
                               msg: "Este EMAIL ya esta registrado"
                                   }
                       },
                       oldData:req.body
                       });            
                    }
                   })


         // intento de  CRUD de user

        db.User.create({
            first_name: req.body.name,
            last_name: req.body.lastname,
            password:bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            dob: req.body.dob,
            avatar : req.file == undefined ? 'avatar-by-default.png' : req.file.filename,
           
            
            
        })
         
        return res.render('users/login')
         
       
        },

    login: (req,res) => {
        return res.render('users/login');
    }, 
    logged: (req,res) => {
            
      let userToLogin=  db.User.findOne({
                where:{
                    email:req.body.email
                }
            

        })
        
        
        //let userToLogin = User.findByField("email", req.body.email)
        .then((userToLogin) => {
            
        if (userToLogin) {
            console.log(userToLogin.password)
            let isokpassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (isokpassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.recordame){
                    res.cookie("email", req.body.email, {maxAge: (1000 * 60)*2000})
                }
                return res.redirect("/")
            }
            return res.render("users/login", {
                errors: {
                    email: {
                    msg: "Datos Erroneos"
                        }
            },
            });    
        };
        return res.render("login", {
            errors: {
                email: {
                msg: "No se encuentra este usuario registrado"
                    }
        },
        })
        .catch(function () {
            console.log(error);
        })
     
         
    });
},

    userProfile: (req,res) => { 
        
        return res.render('users/userprofile', {
            user: req.session.userLogged,
        });
    
    },

    logout: (req,res) => {
        res.clearCookie("email")
        req.session.destroy();
        res.redirect("/")
    },


    editProfile: (req,res) => { 

        
        return res.render('users/editprofile', {
            user: req.session.userLogged,
        });
        
    
    },

    savechangesprofile: (req,res) => { 
        
        const resultValidation=validationResult(req)
        db.User.update({
            first_name: req.body.name,
            last_name: req.body.lastname,
            email: req.body.email,
            dob: req.body.dob,
            avatar: req.file.filename,
            password: bcrypt.hashSync(req.body.password, 10),
        },
         {
            where: {
                id: req.params.id
            }
        });
    
         if(resultValidation.errors.length > 0){
            res.render('users/editprofile',{
                errors:resultValidation.mapped(),
                oldData:req.body
            });
         }
         
        
         res.clearCookie("email")
         req.session.destroy();
          res.redirect("/users/login")
        },
    

        delete:(req,res) => {

            db.User.findOne( 
                {where: { id:req.params.id}})
                .then(borrarImg => {
                    fs.unlinkSync(path.resolve(__dirname,'../../public/img/avatars/'+ borrarImg.avatar))})

            db.Favoritos.destroy({
                where: {
                    product_id: req.params.id
                }
            })

            db.Cart.destroy({
                where: {
                    product_id: req.params.id
                }
            })

            .then(function(borrado) {
                db.User.destroy({
                    where:{
                        id:req.params.id
                    }
                })
            })
                res.clearCookie("email")
                req.session.destroy();
                res.redirect("/users/register")

          
        },
        list: (req,res) => {
            db.User.findAll()
            .then(mail => {
                return res.json(mail)
                
            } )

        }
 }
