  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        Booking.belongsTo(models.Customer, { foreignKey: 'id' });
        Booking.belongsTo(models.House, { foreignKey: 'id' });
        Booking.belongsTo(models.Room, { foreignKey: 'room_id' });
      }
    }
    Booking.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'room_id'
        }
      },
      check_in_date: DataTypes.DATE,
      check_out_date: DataTypes.DATE,
      total_amount: DataTypes.DECIMAL,
      booking_status: DataTypes.BOOLEAN,
    }, {
      sequelize,
      modelName: 'Booking',
    });
    return Booking;
  };