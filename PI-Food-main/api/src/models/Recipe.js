const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     allowNull: false,
     primaryKey:true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    overview:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    spoonacularScore:{
      type:DataTypes.FLOAT
    },
    healthyScore:{
      type:DataTypes.FLOAT
    },
    instructions:{
      type:DataTypes.TEXT
    },
    image:{
      type: DataTypes.TEXT
    },
    steps: {
      type: DataTypes.TEXT
    },
  });
};
