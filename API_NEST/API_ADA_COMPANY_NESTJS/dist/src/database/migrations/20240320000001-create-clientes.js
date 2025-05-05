'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('clientes', {
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
            endereco: {
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
        await queryInterface.dropTable('clientes');
    },
};
//# sourceMappingURL=20240320000001-create-clientes.js.map