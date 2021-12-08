module.exports=function(sequelize,dataTypes){
    const alias='Categories';

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
    const Categories=sequelize.define(alias,cols,config);
    return Categories;
}