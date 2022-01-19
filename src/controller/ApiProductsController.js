const db = require ('../database/models')
const Op = db.sequelize.Op;

module.exports = {
    list : (req, res) => {
        db.Product.findAll({include:{all: true}})
        .then(productos => {
            let detail = []
            productos.forEach(producto => {
                detail.push({
                id : producto.id,
                name : producto.name,
                descripcion : producto.description,
                //color: colors,
                material: producto.materials.material,
                Origen : producto.Country.country,
                detail : "http://localhost3000:/api/product/" + producto.id,
                })
            })

            return res.status(200).json({
                count :  productos.length,
                products : detail,
                status : 200  
            })
        })
        
    },
    detail : (req , res) => {
        db.Product.findByPk(req.params.id,{include:{all: true}})
        .then(producto => {
            let colores = []
            let categorias = []
            producto.colors.forEach(color => {
                colores.push(color.color)
            })
            producto.categories.forEach(categoria => {
                categorias.push(categoria.category)
            })


            return res.status(200).json({
                Nombre : producto.name,
                Descripcion : producto.description,
                Medidas : producto.measure,
                Material : producto.materials.material,
                Origen : producto.Country.country,
                Color : colores,
                Categoria : categorias,
                Imagen : "http://localhost3000:/public/img/productos/" + producto.img,
                status : 200  
            })
        })
    },

}