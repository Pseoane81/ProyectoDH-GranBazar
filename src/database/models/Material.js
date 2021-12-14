module.exports=function(sequelize,dataTypes){
    const alias='Material';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        category_id:{
            type:dataTypes.STRING
        }
    }
    
    const config={
        tableName:'materials',
        timestamps:false,
        underscored: true,
    }
    const Material=sequelize.define(alias,cols,config);
    Material.associate=function(models) {
        Material.hasMany(models.Product, {
            as: "products",
            foreingkey: "material_id"
        })
    }
    return Material;
}