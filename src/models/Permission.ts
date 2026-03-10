import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database";

interface PermissionAttributes {
  id: number;
  name: string;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "id"> {}

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public id!: number;
  public name!: string;

  static associate(models: any) {
    this.belongsToMany(models.Role, {
      through: "role_permissions",
      foreignKey: "permission_id",
      otherKey: "role_id",
      as: "roles",
      timestamps: false,
    });
  }
}

Permission.init(
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
    tableName: "permissions",
    modelName: "Permission",
    timestamps: false,
  }
);

export default Permission;