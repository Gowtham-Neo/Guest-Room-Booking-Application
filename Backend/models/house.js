'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.belongsTo(models.HouseOwner, { foreignKey: 'id' });
      House.hasMany(models.Room, { foreignKey: 'house_id' ,as: 'rooms', onDelete: 'CASCADE'});
      House.hasMany(models.Booking, { foreignKey: 'id' ,as: 'house'});
    }
  }
  House.init({
    
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HouseOwners',
        key: 'id'
      }
    },
    house_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};