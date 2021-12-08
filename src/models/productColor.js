module.exports=function(sequelize,dataTypes){
    const alias='productColor';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        color_id:{
            type:dataTypes.INTEGER
        },
        product_id:{
            type:dataTypes.INTEGER
        }
    }
    
    const config={
        tableName:'productColors',
        timestamps:false
    }
    const productColor=sequelize.define(alias,cols,config);
    return productColor;
}