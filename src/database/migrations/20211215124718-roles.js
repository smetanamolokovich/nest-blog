'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  },
};
