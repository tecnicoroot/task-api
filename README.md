<a name="top"></a>
🚀 API Node.js + TypeScript + Sequelize

API REST construída com **Node.js**, **TypeScript**, **Express** e **Sequelize**.


![Node](https://img.shields.io/badge/node-18+-green) ![TypeScript](https://img.shields.io/badge/typescript-5-blue) ![Sequelize](https://img.shields.io/badge/sequelize-6-lightgrey) ![License](https://img.shields.io/badge/license-MIT-green)


<details open>
<summary >📑 Índice</summary>

-  [x] [1. Crie e acesse a pasta do projeto](#1-crie-e-acesse-a-pasta-do-projeto)
- [x] [2. Inicialize o projeto](#2-inicialize-o-projeto)
- [x]  [3. Instale as dependências](#3-instale-as-dependencias)
- [x]  [4. Crie o arquivo de configuração do TypeScript](#crie-o-arquivo-de-configuracao-do-typescript)
- [x] [5. Estrutura de pastas](#5-estrutura-de-pastas)
- [x]  [6. Crie o arquivo .env](#6-crie-o-arquivo-env)
  - [x]  [6.1 Configuração do Sequelize](#61-configuracao-do-sequelize)
  - [x]  [6.2 Criação das Migrations](#62-criacao-das-migrations)
  - [x]  [6.3 Criação do Seeder](#63-criacao-do-seeder)
- [x]  [7. Código dos arquivos principais](#7-codigo-dos-arquivos-principais)
  - [x] [7.1 src/config/database.ts](#71-srcconfigdatabasets)
  - [x] [7.2 src/models/Role.ts](#72-srcmodelsrolets)
  - [x] [7.3 src/models/Permission.ts](#73-srcmodelspermissionts)
  - [x] [7.4 src/models/User.ts](#74-srcmodelsuserts)
  - [x] [7.5 src/services/UsersService]()
  - [x] [7.6 src/repositories/UsersRepository]()
  - [x] [7.7 src/controllers/UsersController]()
  - [x] [7.8 src/routes/user.ts]()
  - [x] [7.9 src/index.ts]()
- [x]  [8. Adicione o script de dev no package.json](#8-adicione-o-script-de-dev-no-packagejson)
- [x]  [9. Rode o projeto](#9-rode-o-projeto)
- [ ]  [10. Validação de Dados](#10-validacao-de-dados)
- [ ]  [11. Atualizar e Deletar Usuário](#11-atualizar-e-deletar-usuario)
- [ ]  [12. Autenticação JWT](#12-autenticacao-jwt)
- [ ]  [13. Relacionamento entre Models](#13-relacionamento-entre-models)
- [ ]  [14. Paginação](#14-paginacao)
- [ ]  [15. Filtros e Busca](#15-filtros-e-busca)
- [ ]  [16. CORS](#16-cors)
- [ ]  [17. Versionamento com Git e Github](#17-versionamento-com-git-e-github)
- [ ]  [Comandos do Sequelize](#comandos-do-sequelize)

</details>

### 1. Crie e acesse a pasta do projeto
```bash
mkdir meu-projeto
cd meu-projeto
```
[⬆ Voltar ao topo](#top)
### 2. Inicialize o projeto
```bash
yarn init -y
```
[⬆ Voltar ao topo](#top)
### 3. Instale as dependências
```bash
yarn add express sequelize pg pg-hstore dotenv sequelize-typescript bcrypt md5
yarn add -D typescript @types/express @types/node nodemon ts-node sequelize-cli @types/sequelize @types/bcrypt @types/md5
```
[⬆ Voltar ao topo](#top)
### 4. Crie o arquivo de configuração do TypeScript
```bash
npx tsc --init
```
Edite o `tsconfig.json` para garantir as opções abaixo:
```bash
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```
[⬆ Voltar ao topo](#top)
### 5. Estrutura de pastas
Organize assim:
```bash
project/
├── README.md
├── src/
│   ├── index.ts
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   └── user.ts
│   ├── routes/
│   │   └── user.ts
└── .env
```
[⬆ Voltar ao topo](#top)
### 6. Crie o arquivo **.env**
Exemplo:
```
# banco de dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seubanco
DB_PORT=5432

# token JWT
SECRET=
EXPIRESIN=

# E-mail
EMAIL_HOST=
EMAIL_USER=
EMAIL_PASS=
EMAIL_PORT=

# REDIS
REDIS_HOST=
REDIS_PORT=
REDIS_USER=
REDIS_PASSWORD=

# API
API_URL=
API_PORT=
API_PORT_PRONT=

```
[⬆ Voltar ao topo](#top)
#### 6.1 Configuração do Sequelize.
'''
    yarn sequelize init'''
'''
A execução do comando cria as seguintes pastas na raiz do projeto:
'''
project/
├── config/
│   └── config.json
├── migrations/
├── models/
├── seeders/
└── ...
'''
Por questão de organizaão vou copiar as pastas criadas para a pasta src/database/.
'''
mv config/ src/database/
mv migrations/ src/database/
mv models/ src/database/
mv seeders/ src/database/
'''

Após esta alteração ficará assim:
'''
project/
├── src/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
└── ...
'''

Será necessário criar o arquivo .sequelizerc com o segunte conteúdo:
'''

const { resolve } = require("path");

module.exports = {
  "config": resolve(__dirname, "src", "config", "database.js"),
  "models-path": resolve(__dirname, "src", "app", "models"),
  "migrations-path": resolve(__dirname, "src", @types/bcrypt @types/md5"database", "migrations"),
  "seeders-path": resolve(__dirname, "src", "database", "seeds")
}

'''
[⬆ Voltar ao topo](#top)
#### 6.2 Criação das Migrations

``` 20251121192254-create-users.js ```
```javascript
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
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "empresas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

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

```


``` 20251212193044-create-roles.js ```
```javascript
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("roles");
  },
};

```
``` 20251212193058-create-permissions.js ```
```javascript
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permissions", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("permissions");
  },
};

```
``` 20251212193121-create-user-roles.js ```
```javascript
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_roles", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

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
    await queryInterface.addConstraint("user_roles", {
      fields: ["user_id", "role_id"],
      type: "primary key",
      name: "pk_user_roles",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_roles");
  },
};

```

``` 20251212193141-create-role-permissions.js ```
```javascript
RolePermission.init(
  {
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "role_permissions",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

```
[⬆ Voltar ao topo](#top)
### 6.3 Criação do Seeder
```javascript
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
```
[⬆ Voltar ao topo](#top)
### 7. Código dos arquivos principais
### 7.1 **src/config/database.ts**

```javascript
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
```
### 7.2 **src/models/Role.ts**

```javascript
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
```
### 7.3 **src/models/Permission.ts**
```javascript
import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database.ts";

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
```

### 7.4 **src/models/User.ts**
```javascript
import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import bcrypt from "bcrypt";
import md5 from "md5";
import sequelize from "../config/database.ts";

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
```
[⬆ Voltar ao topo](#top)
### 7.5 **src/services**
```javascript
import UsersRepository from "../repositories/UsersRepository";

class UsersService {

  async listUsers() {
    return UsersRepository.findAll();
  }

  async getUser(id: number) {

    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async createUser(data: any) {

    const emailExists = await UsersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new Error("Email já cadastrado");
    }

    return UsersRepository.create(data);
  }

  async updateUser(id: number, data: any) {

    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return UsersRepository.update(user, data);
  }

  async deleteUser(id: number) {

    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await UsersRepository.delete(user);
  }

}

export default new UsersService();
```
[⬆ Voltar ao topo](#top)
### 7.6 **src/repositories**
```javascript
import User from "../models/User";

class UsersRepository {

  async findAll() {
    return User.findAll();
  }

  async findById(id: number) {
    return User.findByPk(id);
  }

  async findByEmail(email: string) {
    return User.findOne({
      where: { email }
    });
  }

  async create(data: any) {
    return User.create(data);
  }

  async update(user: any, data: any) {
    return user.update(data);
  }

  async delete(user: any) {
    return user.destroy();
  }

}

export default new UsersRepository();
```
### 7.7 **src/controllers**
```javascript
import { Request, Response } from "express";
import UsersService from "../services/UsersService";

class UsersController {

  async index(req: Request, res: Response) {

    const users = await UsersService.listUsers();

    return res.json(users);
  }

  async show(req: Request, res: Response) {

    try {

      const user = await UsersService.getUser(Number(req.params.id));

      return res.json(user);

    } catch (error: any) {

      return res.status(404).json({
        error: error.message
      });

    }
  }

  async create(req: Request, res: Response) {

    try {

      const user = await UsersService.createUser(req.body);

      return res.status(201).json(user);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async update(req: Request, res: Response) {

    try {

      const user = await UsersService.updateUser(
        Number(req.params.id),
        req.body
      );

      return res.json(user);

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

  async destroy(req: Request, res: Response) {

    try {

      await UsersService.deleteUser(Number(req.params.id));

      return res.json({
        message: "Usuário removido"
      });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  }

}

export default new UsersController();
```

[⬆ Voltar ao topo](#top)
### 7.8 **src/routes/user.ts**
```javascript
import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: err });
  }
});

export default router;
```
### 7.9 **src/index.ts**
```javascript
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}).catch((err) => {
  console.error('Erro ao conectar ao banco:', err);
});
```
[⬆ Voltar ao topo](#top)

### 8. Adicione o script de dev no `package.json`
```javascript
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts"
}
```
[⬆ Voltar ao topo](#top)
### 9. Rode o projeto
```bash
npm run dev
ou
yarn dev
```

###Observações:

Crie o banco de dados PostgreSQL antes de rodar o projeto.
O Sequelize pode criar a tabela se ela não existir usando o .sync().
Adapte e expanda conforme sua necessidade.
Se quiser, posso enviar o projeto pronto para download ou te ajudar a expandir para outras funcionalidades!
[⬆ Voltar ao topo](#top)

### 10. Validação de Dados
Use a biblioteca express-validator.

Instalação
```bash
npm install express-validator
ou
yarn add express-validator
```
Exemplo no user.ts:
```javascript
import { body, validationResult } from 'express-validator';

// No POST de usuário:
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... restante igual
  }
);
```
[⬆ Voltar ao topo](#top)
### 11.  Atualizar e Deletar Usuário
Adicione no **user.ts**:
```javascript
// Atualizar usuário
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar', details: err });
  }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar', details: err });
  }
});
```
[⬆ Voltar ao topo](#top)
### 12. Autenticação JWT
Instale:
<pre>
npm install jsonwebtoken bcryptjs
ou
yarn add jsonwebtoken bcryptjs
</pre>
No User model, adicione campo password (e ajuste migrations/tabela):
```javascript
password: { type: DataTypes.STRING, allowNull: false }
```
No cadastro:
```javascript
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hashedPassword });
```
No login (crie rota /login):
```javascript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Senha inválida' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ token });
});
```
[⬆ Voltar ao topo](#top)
#### 13. Relacionamento entre Models
Exemplo: Usuários e Posts

Crie `src/models/Post.ts:`
```javascript
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: false,
  }
);

// Relacionamento
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export default Post;
```
Crie rotas para Posts em `src/routes/post.ts` e importe em index.ts.
[⬆ Voltar ao topo](#top)
### 14. Paginação
No GET de usuários:
```javascript
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  const users = await User.findAndCountAll({ limit: Number(limit), offset });
  res.json({
    total: users.count,
    pages: Math.ceil(users.count / Number(limit)),
    data: users.rows
  });
});
```
[⬆ Voltar ao topo](#top)
### 15. Filtros e Busca
```javascript
router.get('/', async (req, res) => {
  const { name } = req.query;
  const where: any = {};
  if (name) where.name = { [Op.iLike]: `%${name}%` };
  const users = await User.findAll({ where });
  res.json(users);
});
```
Lembre-se de importar Op do Sequelize: import { Op } from 'sequelize';
[⬆ Voltar ao topo](#top)
### 16. CORS
Instalar:
```bash
npm install cors
# ou
yarn add cors
```
No index.ts:
```bash
import cors from 'cors';
app.use(cors());
```
[⬆ Voltar ao topo](#top)
### 17. Versionamento com Git/Github
git clone https://github.com/tecnicoroot/task-api.git
git add ./
git commit -m "primeiro comite."
git remoto -v
git remote -v
git remote remove origin
git remote add origin git@github.com:tecnicoroot/task-api.git
git remote -v
git push origin main