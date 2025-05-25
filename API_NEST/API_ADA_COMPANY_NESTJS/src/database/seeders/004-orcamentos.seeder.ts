'use strict';

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    // Ajuste os IDs conforme os pacotes e clientes já inseridos
    return queryInterface.bulkInsert('orcamentos', [
      {
        valor_orcamento: 5000.00,
        data_orcamento: new Date(2024, 3, 15),
        data_validade: new Date(2024, 4, 15),
        id_pacote: 1, // Ajuste conforme o pacote relacionado
        id_cliente: 1, // Ajuste conforme o cliente relacionado
      },
      {
        valor_orcamento: 4500.00,
        data_orcamento: new Date(2024, 3, 16),
        data_validade: new Date(2024, 4, 16),
        id_pacote: 2, // Ajuste conforme o pacote relacionado
        id_cliente: 2, // Ajuste conforme o cliente relacionado
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('orcamentos', {});
  },
}; 