import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import bcrypt from "bcrypt";
import md5 from "md5";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  name: string;
  email: string;

  password_hash: string;
  activation_hash?: string;

  password?: string;

  phone_number?: string;
  date_of_birth?: Date;
  status?: "ACTIVATED" | "BANNED" | "DEACTIVATED" | "DELETED";
  first_access?: boolean;
  company_id?: number;
  criado_pelo_usuario?: number;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "password_hash"
    | "activation_hash"
    | "phone_number"
    | "date_of_birth"
    | "status"
    | "first_access"
    | "company_id"
    | "criado_pelo_usuario"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;

  public password_hash!: string;
  public activation_hash?: string;

  public password?: string;

  public phone_number?: string;
  public date_of_birth?: Date;
  public status?: "ACTIVATED" | "BANNED" | "DEACTIVATED" | "DELETED";
  public first_access?: boolean;
  public company_id?: number;
  public criado_pelo_usuario?: number;

  // verificar senha
  public checkPassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }

  // gerar senha temporária
  static generateTemporaryPassword(length = 8) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let password = "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }

  recovery_password() {
    return md5(this.email);
  }

  static associate(models: any) {
    this.belongsTo(models.Company, {
      foreignKey: "id_empresa",
      as: "company",
    });

    this.belongsTo(models.User, {
      foreignKey: "criado_pelo_usuario",
      as: "creator",
    });

    this.hasMany(models.User, {
      foreignKey: "criado_pelo_usuario",
      as: "createdUsers",
    });

    this.belongsToMany(models.Role, {
      through: "user_roles",
      foreignKey: "user_id",
      otherKey: "role_id",
      as: "roles",
      timestamps: false,
    });
  }
}

User.init(
  {
    
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      field: "nome",
    },

    email: DataTypes.STRING,

    password: {
      type: DataTypes.VIRTUAL,
    },

    password_hash: {
      type: DataTypes.STRING,
      field: "password",
    },

    activation_hash: {
      type: DataTypes.STRING,
      field: "hash_ativacao",
    },

    phone_number: {
      type: DataTypes.STRING,
      field: "telefone",
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      field: "data_nascimento",
    },

    status: {
      type: DataTypes.ENUM(
        "ACTIVATED",
        "BANNED",
        "DEACTIVATED",
        "DELETED"
      ),
    },

    first_access: {
      type: DataTypes.BOOLEAN,
      field: "primeiro_acesso",
    },

    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_empresa",
    },

    criado_pelo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    modelName: "User",
    underscored: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);


// Hooks
User.beforeSave(async (user: User) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }

  if (!user.activation_hash) {
    user.activation_hash = md5(user.email);
  }
});

export default User;