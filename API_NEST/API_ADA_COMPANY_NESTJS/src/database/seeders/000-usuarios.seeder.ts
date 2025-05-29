'use strict';

const bcrypt = require('bcrypt');
const { v4: usuariosUUID } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('senha123', 10);
    
    return queryInterface.bulkInsert('usuarios', [
      {
        id_usuario: usuariosUUID(),
        nome_completo: 'João Silva',
        telefone: '(11) 99999-9999',
        email: 'joao.silva@email.com',
        senha: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: usuariosUUID(),
        nome_completo: 'Maria Santos',
        telefone: '(11) 98888-8888',
        email: 'maria.santos@email.com',
        senha: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: usuariosUUID(),
        nome_completo: 'Pedro Silva',
        telefone: '(11) 97777-7777',
        email: 'pedro.silva@adacompany.com',
        senha: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: usuariosUUID(),
        nome_completo: 'Ana Costa',
        telefone: '(11) 96666-6666',
        email: 'ana.costa@adacompany.com',
        senha: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: usuariosUUID(),
        nome_completo: 'Carlos Santos',
        telefone: '(11) 95555-5555',
        email: 'carlos.santos@adacompany.com',
        senha: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('usuarios', {});
  },
}; 