'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('clientes', 'senha', {
      type: Sequelize.STRING,
      allowNull: true, // permitido null para não quebrar registros existentes
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('clientes', 'senha');
  },
}; 