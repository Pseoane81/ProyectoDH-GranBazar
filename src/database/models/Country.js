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
        timestamps:false,
        underscored: true,
    }
    const Country=sequelize.define(alias,cols,config);
    Country.associate=function(models) {
        Country.hasMany(models.Product, {
            as: "products",
            foreingkey: "country_id"
        }),
        Country.hasMany(models.User, {
            as: "users",
            foreingkey: "country_id"
        })
    }
    return Country;
}