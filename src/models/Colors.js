module.exports=function(sequelize,dataTypes){
    const alias='Colors';

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
        tableName:'colores',
        timestamps:false
    }
    const Colors=sequelize.define(alias,cols,config);
    return Colors;
}