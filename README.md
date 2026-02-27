# Passo a Passo
### 1. Crie e acesse a pasta do projeto
```bash
mkdir meu-projeto
cd meu-projeto
```

### 2. Inicialize o projeto
```bash
npm init -y
ou
yarn init -y
```

### 3. Instale as dependências
```bash
npm install express sequelize pg pg-hstore dotenv
npm install -D typescript @types/express @types/node nodemon ts-node
ou
yarn add express sequelize pg pg-hstore dotenv
yarn add -D typescript @types/express @types/node nodemon ts-node
```

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
│   └── changelog.md
└── .env
```

### 6. Crie o arquivo **.env**
Exemplo:
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seubanco
DB_PORT=5432
```

### 7. Código dos arquivos principais
**src/config/database.ts**

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

```src/models/User.ts```
```javascript
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
```

**src/routes/user.ts**
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
**src/index.ts**
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

### 8. Adicione o script de dev no `package.json`
```javascript
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts"
}
```

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