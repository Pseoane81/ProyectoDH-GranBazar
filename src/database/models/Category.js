module.exports=function(sequelize,dataTypes){
    const alias='Category';

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
        tableName:'categories',
        timestamps:false
    }
    const Category=sequelize.define(alias,cols,config);
    return Category;
}