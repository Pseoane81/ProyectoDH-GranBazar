function adminMiddelware(req,res,next) {
    if (req.session.userLogged.rol != "admin") {
        res.redirect("/users/userprofile")
    }
    next();
}
module.exports = adminMiddelware