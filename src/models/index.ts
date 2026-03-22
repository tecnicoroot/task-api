import sequelize from '../config/database';
import Role from './Role';
import Permission from './Permission';

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize').Sequelize;

db.Role = Role;
db.Permission = Permission;

// Chama associações
Role.associate(db);
Permission.associate(db);

export default db;