'use strict';

const { QueryTypes: ContratosQueryTypes } = require('sequelize');
const { v4: contratosUUID } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Buscar os IDs dos orçamentos
    const orcamentos = await queryInterface.sequelize.query(
      'SELECT cod_orcamento, id_cliente FROM orcamentos ORDER BY created_at ASC LIMIT 2;',
      { type: ContratosQueryTypes.SELECT }
    );

    if (!orcamentos || orcamentos.length < 2) {
      throw new Error('Orçamentos não encontrados para criar contratos');
    }

    return queryInterface.bulkInsert('contratos', [
      {
        cod_contrato: contratosUUID(),
        data_inicio: new Date(2024, 4, 1),
        data_fim: new Date(2024, 5, 1),
        valor_contrato: 5000.00,
        status_contrato: 'EM_ANALISE',
        id_orcamento: orcamentos[0].cod_orcamento,
        id_cliente: orcamentos[0].id_cliente,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cod_contrato: contratosUUID(),
        data_inicio: new Date(2024, 4, 2),
        data_fim: new Date(2024, 5, 2),
        valor_contrato: 4500.00,
        status_contrato: 'EM_ANDAMENTO',
        id_orcamento: orcamentos[1].cod_orcamento,
        id_cliente: orcamentos[1].id_cliente,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('contratos', {});
  },
}; 