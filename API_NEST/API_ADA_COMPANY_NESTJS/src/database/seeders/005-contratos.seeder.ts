import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    // Ajuste os IDs conforme os clientes e orçamentos já inseridos
    return queryInterface.bulkInsert('contratos', [
      {
        id_cliente: 1, // Ajuste conforme o cliente relacionado
        valor_contrato: 5000.00,
        cod_orcamento: 1, // Ajuste conforme o orçamento relacionado
        status_contrato: 'ativo',
        data_inicio: new Date(2024, 4, 1),
        data_entrega: new Date(2024, 4, 30),
      },
      {
        id_cliente: 2, // Ajuste conforme o cliente relacionado
        valor_contrato: 4500.00,
        cod_orcamento: 2, // Ajuste conforme o orçamento relacionado
        status_contrato: 'ativo',
        data_inicio: new Date(2024, 4, 2),
        data_entrega: new Date(2024, 4, 31),
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('contratos', {});
  },
}; 