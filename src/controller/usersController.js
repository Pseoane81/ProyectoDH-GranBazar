const path=require('path');

let controller = {
    register:  (req,res)=> {
        res.render('register')
        
    },
    registered: function (req, res) {
        
    },
    login (req,res) {
            res.render('login');
        }
    }



module.exports = controller;