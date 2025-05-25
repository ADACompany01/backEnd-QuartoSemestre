'use strict';

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('funcionarios', [
      {
        nome_completo: 'Pedro Silva',
        email: 'pedro.silva@adacompany.com',
        telefone: '(11) 97777-7777',
        id_usuario: 3, // Ajuste conforme o usuário relacionado
      },
      {
        nome_completo: 'Ana Costa',
        email: 'ana.costa@adacompany.com',
        telefone: '(11) 96666-6666',
        id_usuario: 4, // Ajuste conforme o usuário relacionado
      },
      {
        nome_completo: 'Carlos Santos',
        email: 'carlos.santos@adacompany.com',
        telefone: '(11) 95555-5555',
        id_usuario: 5, // Ajuste conforme o usuário relacionado
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('funcionarios', {});
  },
}; 