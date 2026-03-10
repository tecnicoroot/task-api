'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Admin',
        email: 'admin@example.com',
        password: '$2b$08$5tCWxLA8fAv3YeAe2pbAEutdwovGReJHPI8Vu0MIzkE9SlFdexkPi', // idealmente use bcrypt antes
        status: 'ACTIVATED',
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
