'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacotes', {
      id_pacote: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      tipo_pacote: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_base: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    await queryInterface.dropTable('pacotes');
  }
};
