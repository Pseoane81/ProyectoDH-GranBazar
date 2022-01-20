const db = require ('../database/models')


module.exports = {
    list : (req, res) => {
        let categoria = db.Category.findAll({include: {all: true}})
        let productos = db.Product.findAll({include:{all: true}})
        Promise.all([productos,categoria])
        .then(function([productos,categoria]){
            let detail = []
            let countbyCategory = []
            productos.forEach(producto => {
                detail.push({
                id : producto.id,
                name : producto.name,
                descripcion : producto.description,
                color: producto.colors,
                categoria: producto.categories,
                //material: producto.materials.material,
                //Origen : producto.Country.country,
                detail : "http://localhost:3001/api/products/" + producto.id,
                })
            })
            categoria.forEach(categoria => {
                countbyCategory.push({
                Nombre: categoria.category,
                Cantidad: categoria.products.length,
                }) 
            })

            return res.status(200).json({
                count :  productos.length,
                CountByCategory : countbyCategory,
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
                Imagen : "http://localhost:3001/img/productos/" + producto.img,
                status : 200  
            })
        })
    },

}