'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('blog', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.CHAR,
        unique: true,
        allowNull: true,
      },
      title: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: Sequelize.BLOB({
          length: 'long',
        }),
        allowNull: true,
        defaultValue: null,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    return queryInterface.dropTable('blog');
  },
};
