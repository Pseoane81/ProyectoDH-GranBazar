module.exports=function(sequelize,dataTypes){
    const alias='Products';

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
        color_id:{
            type:dataTypes.INTEGER
        },
        origin_id:{
            type:dataTypes.INTEGER
        },
        img:{
            type:dataTypes.INTEGER
        },
        category_id:{
            type:dataTypes.INTEGER
        },
        material_id:{
            type:dataTypes.INTEGER
        }
    },
    const config={
        tableName:'products',
        timestamps:false
    }
    const Products=sequelize.define(alias,cols,config);
    return Products;
}