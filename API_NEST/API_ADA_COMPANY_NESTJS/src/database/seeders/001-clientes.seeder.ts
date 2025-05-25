'use strict';

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('clientes', [
      {
        nome_completo: 'João Silva',
        cnpj: '12.345.678/0001-90',
        telefone: '(11) 99999-9999',
        email: 'joao.silva@email.com',
        id_usuario: 1, // Ajuste conforme o usuário relacionado
      },
      {
        nome_completo: 'Maria Santos',
        cnpj: '98.765.432/0001-10',
        telefone: '(11) 98888-8888',
        email: 'maria.santos@email.com',
        id_usuario: 2, // Ajuste conforme o usuário relacionado
      },
      // Adicione mais clientes conforme necessário
    ]);
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('clientes', {});
  },
}; 