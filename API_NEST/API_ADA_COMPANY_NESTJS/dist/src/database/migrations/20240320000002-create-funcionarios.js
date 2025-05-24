'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('funcionarios', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            telefone: {
                type: Sequelize.STRING,
            },
            cpf: {
                type: Sequelize.STRING,
                unique: true,
            },
            cargo: {
                type: Sequelize.STRING,
            },
            especialidade: {
                type: Sequelize.STRING,
            },
            senha: {
                type: Sequelize.STRING,
            },
            ativo: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            dataCriacao: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('funcionarios');
    },
};
//# sourceMappingURL=20240320000002-create-funcionarios.js.map