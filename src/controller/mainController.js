const path = require ('path');

let controller = {
    home: (req,res) => {
        res.render('home');
    },
    about: (req,res) => {
        res.render('about');
    }
}

module.exports = controller;
