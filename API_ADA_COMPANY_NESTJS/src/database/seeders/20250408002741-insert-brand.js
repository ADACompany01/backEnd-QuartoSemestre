'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'brand',
      [
        {
          name: 'Garoto',
        },
        {
          name: 'Coca Cola',
        },
        {
          name: 'Lacta',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('brand', null, {});
  },
};
