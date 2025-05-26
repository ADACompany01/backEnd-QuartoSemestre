'use strict';
const { QueryTypes: ClientesQueryTypes } = require('sequelize');
const { v4: clientesUUID } = require('uuid');
module.exports = {
    async up(queryInterface) {
        const usuarios = await queryInterface.sequelize.query('SELECT id_usuario FROM usuarios ORDER BY created_at ASC LIMIT 2;', { type: ClientesQueryTypes.SELECT });
        if (!usuarios || usuarios.length < 2) {
            throw new Error('Usuários não encontrados para criar clientes');
        }
        return queryInterface.bulkInsert('clientes', [
            {
                id_cliente: clientesUUID(),
                nome_completo: 'João Silva',
                cnpj: '12.345.678/0001-90',
                telefone: '(11) 99999-9999',
                email: 'joao.silva@email.com',
                id_usuario: usuarios[0].id_usuario,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id_cliente: clientesUUID(),
                nome_completo: 'Maria Santos',
                cnpj: '98.765.432/0001-10',
                telefone: '(11) 98888-8888',
                email: 'maria.santos@email.com',
                id_usuario: usuarios[1].id_usuario,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('clientes', {});
    },
};
//# sourceMappingURL=001-clientes.seeder.js.map