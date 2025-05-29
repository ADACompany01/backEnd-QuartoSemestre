'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contratos', {
      id_contrato: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valor_contrato: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status_contrato: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cod_orcamento: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orcamentos',
          key: 'cod_orcamento'
        }
      },
      id_cliente: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id_cliente'
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
    await queryInterface.dropTable('contratos');
  }
};
