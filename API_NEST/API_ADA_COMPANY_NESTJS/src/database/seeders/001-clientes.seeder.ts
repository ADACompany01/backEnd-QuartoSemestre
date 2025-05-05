'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('clientes', [
      {
        id: uuidv4(),
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        cpf: '123.456.789-00',
        endereco: 'Rua das Flores, 123',
        ativo: true,
        dataCriacao: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Maria Santos',
        email: 'maria.santos@email.com',
        telefone: '(11) 98888-8888',
        cpf: '987.654.321-00',
        endereco: 'Avenida Principal, 456',
        ativo: true,
        dataCriacao: new Date(),
      },
      // Adicione mais clientes conforme necessário
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('clientes', {});
  },
}; 