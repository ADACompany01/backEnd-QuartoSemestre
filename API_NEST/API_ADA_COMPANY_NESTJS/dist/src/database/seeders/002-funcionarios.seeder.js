'use strict';
const { v4: uuidv4Func } = require('uuid');
const bcrypt = require('bcrypt');
module.exports = {
    async up(queryInterface) {
        const hashedPassword = await bcrypt.hash('senha123', 10);
        return queryInterface.bulkInsert('funcionarios', [
            {
                id: uuidv4Func(),
                nome: 'Pedro Silva',
                email: 'pedro.silva@adacompany.com',
                telefone: '(11) 97777-7777',
                cpf: '111.222.333-44',
                cargo: 'Desenvolvedor Frontend',
                especialidade: 'Desenvolvimento Web Acessível',
                senha: hashedPassword,
                ativo: true,
                dataCriacao: new Date(),
            },
            {
                id: uuidv4Func(),
                nome: 'Ana Costa',
                email: 'ana.costa@adacompany.com',
                telefone: '(11) 96666-6666',
                cpf: '555.666.777-88',
                cargo: 'UX/UI Designer',
                especialidade: 'Design Universal e Acessibilidade',
                senha: hashedPassword,
                ativo: true,
                dataCriacao: new Date(),
            },
            {
                id: uuidv4Func(),
                nome: 'Carlos Santos',
                email: 'carlos.santos@adacompany.com',
                telefone: '(11) 95555-5555',
                cpf: '999.888.777-66',
                cargo: 'Desenvolvedor Backend',
                especialidade: 'APIs e Integrações',
                senha: hashedPassword,
                ativo: true,
                dataCriacao: new Date(),
            }
        ]);
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('funcionarios', {});
    },
};
//# sourceMappingURL=002-funcionarios.seeder.js.map