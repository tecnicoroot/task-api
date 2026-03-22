import { Model, DataTypes, Optional, NonAttribute, BelongsToManySetAssociationsMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import Permission from './Permission';

interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;

  // ⚡ Tipagem correta para Sequelize
  public permissions?: NonAttribute<Permission[]>;

  // ✅ Mixins gerados pelo belongsToMany
  public getPermissions!: BelongsToManyGetAssociationsMixin<Permission>;
  public setPermissions!: BelongsToManySetAssociationsMixin<Permission, number>;

  static associate(models: any) {
    this.belongsToMany(models.Permission, {
      through: 'role_permissions',
      foreignKey: 'role_id',
      otherKey: 'permission_id',
      as: 'permissions',
      timestamps: true,
    });
  }
}

Role.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, field: 'nome' },
  },
  {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
    underscored: true,
    timestamps: false,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
  }
);

export default Role;