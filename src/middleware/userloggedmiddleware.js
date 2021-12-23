const db = require("../database/models");

function userloggedmiddleware(req,res,next){
    res.locals.islogged = false
    
    let emailInCookie = req.cookies.email;
    
    db.User.findOne({
		where: {
			email: emailInCookie
		}
	}).then(userFromCookie =>{
		if (userFromCookie) {
			req.session.userLogged = userFromCookie;
		}
	})
	.catch(noLogged =>{
		console.log("No hay nadie logueado")
	})

	

	if (req.session.userLogged) {
		console.log("Hay alguien logueado ")
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = userloggedmiddleware