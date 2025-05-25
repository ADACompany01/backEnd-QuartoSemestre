import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    // IDs dos clientes conforme o seeder de clientes
    const pacotes = [
      // Pacotes para o cliente 1
      { id_cliente: 1, tipo_pacote: 'A', valor_base: 1500.00 },
      { id_cliente: 1, tipo_pacote: 'AA', valor_base: 2500.00 },
      { id_cliente: 1, tipo_pacote: 'AAA', valor_base: 4000.00 },
      // Pacotes para o cliente 2
      { id_cliente: 2, tipo_pacote: 'A', valor_base: 1500.00 },
      { id_cliente: 2, tipo_pacote: 'AA', valor_base: 2500.00 },
      { id_cliente: 2, tipo_pacote: 'AAA', valor_base: 4000.00 },
    ];
    return queryInterface.bulkInsert('pacotes', pacotes);
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('pacotes', {});
  },
}; 