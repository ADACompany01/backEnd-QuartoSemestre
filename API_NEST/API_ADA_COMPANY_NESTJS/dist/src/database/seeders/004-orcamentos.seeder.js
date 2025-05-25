'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('orcamentos', [
            {
                valor_orcamento: 5000.00,
                data_orcamento: new Date(2024, 3, 15),
                data_validade: new Date(2024, 4, 15),
                id_pacote: 1,
                id_cliente: 1,
            },
            {
                valor_orcamento: 4500.00,
                data_orcamento: new Date(2024, 3, 16),
                data_validade: new Date(2024, 4, 16),
                id_pacote: 2,
                id_cliente: 2,
            }
        ]);
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('orcamentos', {});
    },
};
//# sourceMappingURL=004-orcamentos.seeder.js.map