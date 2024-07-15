'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.House, { foreignKey: 'house_id',as: 'house', onDelete: 'CASCADE'  });
      Room.belongsTo(models.HouseOwner, { foreignKey: 'id' });
      Room.hasMany(models.Booking, { foreignKey: 'id' });
    }
  }
  Room.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Houses',
        key: 'id'
      }
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HouseOwners',
        key: 'id'
      }
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
      
    },

    room_name: DataTypes.STRING,
    max_guest:DataTypes.INTEGER,
    floor_size: DataTypes.DECIMAL,
    beds_count: DataTypes.STRING,
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    min_stay: DataTypes.INTEGER,
    max_stay: DataTypes.INTEGER,
    rent_amount: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};