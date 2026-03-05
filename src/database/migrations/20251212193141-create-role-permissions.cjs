"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role_permissions", {
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

    // Primary key composta
    await queryInterface.addConstraint("role_permissions", {
      fields: ["role_id", "permission_id"],
      type: "primary key",
      name: "pk_role_permissions",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("role_permissions");
  },
};