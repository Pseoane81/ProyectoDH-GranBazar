module.exports=function(sequelize,dataTypes){
    const alias='Color';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        color:{
            type:dataTypes.STRING
        }
    }
    
    const config={
        tableName:'colors',
        timestamps:false
    }
    const Color=sequelize.define(alias,cols,config);
    return Color;
}