'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        value: 'user',
        description: 'this is user (default) role',
      },
      {
        value: 'admin',
        description: 'this is admin role',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
