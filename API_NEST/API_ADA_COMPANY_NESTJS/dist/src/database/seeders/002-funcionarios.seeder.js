'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('funcionarios', [
            {
                nome_completo: 'Pedro Silva',
                email: 'pedro.silva@adacompany.com',
                telefone: '(11) 97777-7777',
                id_usuario: 3,
            },
            {
                nome_completo: 'Ana Costa',
                email: 'ana.costa@adacompany.com',
                telefone: '(11) 96666-6666',
                id_usuario: 4,
            },
            {
                nome_completo: 'Carlos Santos',
                email: 'carlos.santos@adacompany.com',
                telefone: '(11) 95555-5555',
                id_usuario: 5,
            }
        ]);
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('funcionarios', {});
    },
};
//# sourceMappingURL=002-funcionarios.seeder.js.map