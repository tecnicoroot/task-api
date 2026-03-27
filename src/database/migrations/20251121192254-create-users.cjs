"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      // FK empresa
      /*id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "empresas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },*/

      // FK usuário criador
      criado_pelo_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tipo_acesso: {
        type: Sequelize.ENUM("superadmin", "admin", "colaborador"),
        allowNull: true,
        defaultValue: "colaborador"
      },

      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          "ACTIVATED",
          "BANNED",
          "DEACTIVATED",
          "DELETED"
        ),
        allowNull: false,
        defaultValue: "DEACTIVATED",
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      hash_ativacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      primeiro_acesso: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      criado_em: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      atualizado_em: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("usuarios");

    // remover ENUMs (Postgres)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_usuarios_status";'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_usuarios_tipo_acesso";'
    );
  },
};