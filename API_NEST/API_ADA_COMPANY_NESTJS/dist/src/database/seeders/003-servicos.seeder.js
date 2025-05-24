'use strict';
const { v4: uuidv4Serv } = require('uuid');
module.exports = {
    async up(queryInterface) {
        const funcionarios = await queryInterface.sequelize.query('SELECT id FROM funcionarios LIMIT 3;', { type: queryInterface.sequelize.QueryTypes.SELECT });
        if (funcionarios.length < 3) {
            throw new Error('Funcionários não encontrados. Execute o seeder de funcionários primeiro.');
        }
        return queryInterface.bulkInsert('servicos', [
            {
                id: uuidv4Serv(),
                nome: 'Adaptação de Site para WCAG 2.1',
                descricao: 'Adequação completa do site aos padrões de acessibilidade WCAG 2.1, incluindo suporte a leitores de tela e navegação por teclado',
                valor: 5000.00,
                ativo: true,
                dataCriacao: new Date(),
                funcionarioId: funcionarios[0].id,
            },
            {
                id: uuidv4Serv(),
                nome: 'Redesign UX/UI Acessível',
                descricao: 'Redesign completo da interface com foco em usabilidade universal e conformidade com padrões de acessibilidade',
                valor: 4500.00,
                ativo: true,
                dataCriacao: new Date(),
                funcionarioId: funcionarios[1].id,
            },
            {
                id: uuidv4Serv(),
                nome: 'Desenvolvimento de API Acessível',
                descricao: 'Desenvolvimento de API RESTful com documentação acessível e integração com ferramentas assistivas',
                valor: 6000.00,
                ativo: true,
                dataCriacao: new Date(),
                funcionarioId: funcionarios[2].id,
            }
        ]);
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('servicos', {});
    },
};
//# sourceMappingURL=003-servicos.seeder.js.map