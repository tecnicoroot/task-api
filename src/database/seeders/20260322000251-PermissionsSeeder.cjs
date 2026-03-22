'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      {
        nome: 'create_user',
        criado_em: new Date(),
        atualizado_em: new Date(),  
      },
      {
        nome: 'read_user',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        nome: 'update_user',
        criado_em: new Date(),
        atualizado_em: new Date(),  
      },
      {
        nome: 'delete_user' ,
        criado_em: new Date(),
        atualizado_em: new Date(), 
      },

      {
        nome: 'create_permission',
        criado_em: new Date(),
        atualizado_em: new Date(),  
      },
      {
        nome: 'read_permission',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        nome: 'update_permission',
        criado_em: new Date(),
        atualizado_em: new Date(),  
      },
      {
        nome: 'delete_permission' ,
        criado_em: new Date(),
        atualizado_em: new Date(), 
      },

      {
        nome: 'create_role',
        criado_em: new Date(),
        atualizado_em: new Date(),  
      },
      {
        nome: 'read_role',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        nome: 'update_role',
        criado_em: new Date(),
        atualizado_em: new Date(),  
      },
      {
        nome: 'delete_role' ,
        criado_em: new Date(),
        atualizado_em: new Date(), 
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove os registros inseridos
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
