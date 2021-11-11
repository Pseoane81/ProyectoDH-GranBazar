const path=require('path');
const {validationResult}=require('express-validator');
const fs = require('fs');
const bcrypt = require('bcryptjs');

let users = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), { encoding: 'utf-8'});
users = JSON.parse(users);

const iduser = () => {
    let ultimo = 0;
    users.forEach(user => {
        if (user.id > ultimo) {
            ultimo = user.id;
        }
    });
    return ultimo + 1;
}

module.exports = {
    register:  (req,res)=> {
        res.render('register')
        
    },
    processRegister:(req,res)=>{
        const resultValidation=validationResult(req)
           
    
         if(resultValidation.errors.length > 0){
            res.render('register',{
                errors:resultValidation.mapped(),
                oldData:req.body
            });
         }else {
            const user = {
                id:iduser(),
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 12),
                avatar: req.file.filename
            }
            delete user.repassword;
            
            users.push(user);

            let jsonDeUsuarios = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), jsonDeUsuarios);
            return res.redirect('/users/login');
        }
        },

        login (req,res) {
            res.render('login');

    }, 

    logged (req,res) {

         users.forEach(user => {
            if(user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
                req.session=user.email;
                req.locals.user=user;
            } 

        });
       res.redirect('/');
    },

    userProfile: (req,res) => {
        res.render('userprofile');
    
    }

 }



