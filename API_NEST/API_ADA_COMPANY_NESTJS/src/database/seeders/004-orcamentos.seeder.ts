'use strict';

const { v4: uuidv4Orc } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Primeiro, vamos buscar os IDs dos clientes e serviços
    const clientes = await queryInterface.sequelize.query(
      'SELECT id FROM clientes LIMIT 2;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const servicos = await queryInterface.sequelize.query(
      'SELECT id FROM servicos LIMIT 2;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (clientes.length < 2 || servicos.length < 2) {
      throw new Error('Clientes ou Serviços não encontrados. Execute as seeds anteriores primeiro.');
    }

    return queryInterface.bulkInsert('orcamentos', [
      {
        id: uuidv4Orc(),
        clienteId: clientes[0].id,
        servicoId: servicos[0].id,
        dataServico: new Date(2024, 3, 15),
        status: 'pendente',
        observacoes: 'Cliente solicitou foco especial em compatibilidade com NVDA e VoiceOver',
        valorTotal: 5000.00,
        ativo: true,
        dataCriacao: new Date(),
      },
      {
        id: uuidv4Orc(),
        clienteId: clientes[1].id,
        servicoId: servicos[1].id,
        dataServico: new Date(2024, 3, 16),
        status: 'aprovado',
        observacoes: 'Projeto inclui testes com usuários de tecnologias assistivas',
        valorTotal: 4500.00,
        ativo: true,
        dataCriacao: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('orcamentos', {});
  },
}; 