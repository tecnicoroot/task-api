import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database.ts";

interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;

  static associate(models: any) {
    this.belongsToMany(models.User, {
      through: "user_roles",
      foreignKey: "role_id",
      otherKey: "user_id",
      as: "usuarios",
      timestamps: false,
    });

    this.belongsToMany(models.Permission, {
      through: "role_permissions",
      foreignKey: "role_id",
      otherKey: "permission_id",
      as: "permissions",
      timestamps: false,
    });
  }
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "roles",
    modelName: "Role",
    timestamps: false,
  }
);

export default Role;