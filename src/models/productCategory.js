module.exports=function(sequelize,dataTypes){
    const alias='productCategory';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        category_id:{
            type:dataTypes.INTEGER
        },
        product_id:{
            type:dataTypes.INTEGER
        }
    }
    
    const config={
        tableName:'category',
        timestamps:false
    }
    const productCategory=sequelize.define(alias,cols,config);
    return productCategory;
}