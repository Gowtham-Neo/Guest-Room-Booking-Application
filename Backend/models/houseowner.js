'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HouseOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HouseOwner.hasMany(models.House, { foreignKey: 'id' });
      HouseOwner.hasMany(models.Room, { foreignKey: 'id' });      
    }
  }
  HouseOwner.init({
    
    owner_name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    password: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'HouseOwner',
  });
  return HouseOwner;
};