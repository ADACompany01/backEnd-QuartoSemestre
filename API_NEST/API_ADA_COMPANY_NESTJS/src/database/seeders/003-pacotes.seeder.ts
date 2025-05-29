'use strict';

const { QueryTypes: PacotesQueryTypes } = require('sequelize');
const { v4: pacotesUUID } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Buscar os IDs dos clientes
    const clientes = await queryInterface.sequelize.query(
      'SELECT id_cliente FROM clientes ORDER BY created_at ASC;',
      { type: PacotesQueryTypes.SELECT }
    );

    if (!clientes || clientes.length < 2) {
      throw new Error('Clientes não encontrados para criar pacotes');
    }

    const pacotes = [
      // Pacotes para o cliente 1
      { 
        id_pacote: pacotesUUID(),
        id_cliente: clientes[0].id_cliente, 
        tipo_pacote: 'A', 
        valor_base: 1500.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id_pacote: pacotesUUID(),
        id_cliente: clientes[0].id_cliente, 
        tipo_pacote: 'AA', 
        valor_base: 2500.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id_pacote: pacotesUUID(),
        id_cliente: clientes[0].id_cliente, 
        tipo_pacote: 'AAA', 
        valor_base: 4000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Pacotes para o cliente 2
      { 
        id_pacote: pacotesUUID(),
        id_cliente: clientes[1].id_cliente, 
        tipo_pacote: 'A', 
        valor_base: 1500.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id_pacote: pacotesUUID(),
        id_cliente: clientes[1].id_cliente, 
        tipo_pacote: 'AA', 
        valor_base: 2500.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id_pacote: pacotesUUID(),
        id_cliente: clientes[1].id_cliente, 
        tipo_pacote: 'AAA', 
        valor_base: 4000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert('pacotes', pacotes);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('pacotes', {});
  },
}; 