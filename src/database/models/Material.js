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
        timestamps:false
    }
    const Material=sequelize.define(alias,cols,config);
    return Material;
}