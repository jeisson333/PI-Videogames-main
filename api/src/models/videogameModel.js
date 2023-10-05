const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "iamgen por defecto"
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    rating:{
      type: DataTypes.FLOAT
    }

  },{timestamps: false});
};
