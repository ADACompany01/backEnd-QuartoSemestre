'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orcamentos', {
      cod_orcamento: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      valor_orcamento: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      data_orcamento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_validade: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_pacote: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'pacotes',
          key: 'id_pacote'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orcamentos');
  }
};
