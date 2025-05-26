'use strict';
const { QueryTypes: OrcamentosQueryTypes } = require('sequelize');
const { v4: orcamentosUUID } = require('uuid');
module.exports = {
    async up(queryInterface) {
        const pacotes = await queryInterface.sequelize.query('SELECT id_pacote, id_cliente FROM pacotes ORDER BY created_at ASC LIMIT 2;', { type: OrcamentosQueryTypes.SELECT });
        if (!pacotes || pacotes.length < 2) {
            throw new Error('Pacotes não encontrados para criar orçamentos');
        }
        return queryInterface.bulkInsert('orcamentos', [
            {
                cod_orcamento: orcamentosUUID(),
                valor_orcamento: 5000.00,
                data_orcamento: new Date(2024, 3, 15),
                data_validade: new Date(2024, 4, 15),
                id_pacote: pacotes[0].id_pacote,
                id_cliente: pacotes[0].id_cliente,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                cod_orcamento: orcamentosUUID(),
                valor_orcamento: 4500.00,
                data_orcamento: new Date(2024, 3, 16),
                data_validade: new Date(2024, 4, 16),
                id_pacote: pacotes[1].id_pacote,
                id_cliente: pacotes[1].id_cliente,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('orcamentos', {});
    },
};
//# sourceMappingURL=004-orcamentos.seeder.js.map