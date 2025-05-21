'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('clientes', 'senha', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('clientes', 'senha');
    },
};
//# sourceMappingURL=20240515000001-add-senha-to-clientes.js.map