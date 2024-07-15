'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      house_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Houses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HouseOwners',
          key: 'id'
        },
      },
      room_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      max_guest: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      floor_size: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      beds_count: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      min_stay: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      max_stay: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rent_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};
