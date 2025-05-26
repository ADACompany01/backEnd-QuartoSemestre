'use strict';

const { QueryTypes: FuncionariosQueryTypes } = require('sequelize');
const { v4: funcionariosUUID } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Primeiro, vamos buscar os IDs dos usuários restantes
    const usuarios = await queryInterface.sequelize.query(
      'SELECT id_usuario FROM usuarios ORDER BY created_at ASC LIMIT 3 OFFSET 2;',
      { type: FuncionariosQueryTypes.SELECT }
    );

    if (!usuarios || usuarios.length < 3) {
      throw new Error('Usuários não encontrados para criar funcionários');
    }

    return queryInterface.bulkInsert('funcionarios', [
      {
        id_funcionario: funcionariosUUID(),
        nome_completo: 'Pedro Silva',
        email: 'pedro.silva@adacompany.com',
        telefone: '(11) 97777-7777',
        id_usuario: usuarios[0].id_usuario,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_funcionario: funcionariosUUID(),
        nome_completo: 'Ana Costa',
        email: 'ana.costa@adacompany.com',
        telefone: '(11) 96666-6666',
        id_usuario: usuarios[1].id_usuario,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_funcionario: funcionariosUUID(),
        nome_completo: 'Carlos Santos',
        email: 'carlos.santos@adacompany.com',
        telefone: '(11) 95555-5555',
        id_usuario: usuarios[2].id_usuario,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('funcionarios', {});
  },
}; 