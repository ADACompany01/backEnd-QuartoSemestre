'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orcamentos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      dataServico: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valorTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pendente',
        validate: {
          isIn: [['pendente', 'aprovado', 'recusado', 'cancelado', 'finalizado']]
        }
      },
      observacoes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      dataCriacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      clienteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      servicoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'servicos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orcamentos');
  },
}; 