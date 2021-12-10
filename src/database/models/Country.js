module.exports = function(sequelize,dataTypes){
    const alias='Country';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        country:{
            type:dataTypes.STRING
        },
       
       
        
    };
    const config={
        tableName:'countries',
        timestamps:false
    }
    const Country=sequelize.define(alias,cols,config);
    return Country;
}