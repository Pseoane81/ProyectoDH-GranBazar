module.exports=function(sequelize,dataTypes){
    const alias='Materiales';

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
        tableName:'material',
        timestamps:false
    }
    const Materiales=sequelize.define(alias,cols,config);
    return Materiales;
}