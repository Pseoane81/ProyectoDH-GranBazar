module.exports=function(sequelize,dataTypes){
    const alias='Product';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        name:{
            type:dataTypes.STRING
        },
        description:{
            type:dataTypes.STRING
        },
        measure:{
            type:dataTypes.STRING
        },
        price:{
            type:dataTypes.INTEGER
        },
        country_id:{
            type:dataTypes.INTEGER
        },
        img:{
            type:dataTypes.INTEGER
        },
        material_id:{
            type:dataTypes.INTEGER
        }
    };
    const config={
        tableName:'products',
        timestamps:false,
        underscored: true,
    }
    const Product=sequelize.define(alias,cols,config);
    Product.associate=function(models) {
        Product.belongsTo(models.Country, {
            as: "countries",
            foreingkey: "country_id"
        }),
        Product.belongsTo(models.Material, {
            as: "materials",
            foreingkey: "material_id"
        }),
        Product.belongsToMany(models.Color, {
            as:"colors",
            through:"product_color",
            foreignKey:"product_id",
            otherKey:"color_id",
            timestamps:false
        }),
        Product.belongsToMany(models.Category, {
            as:"categories",
            through:"product_category",
            foreignKey:"product_id",
            otherKey:"category_id",
            timestamps:false
        })
    }
    

    return Product;
}