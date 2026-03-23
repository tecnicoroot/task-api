import sequelize from '../config/database';
import Role from './Role';
import Permission from './Permission';
import User from './User';

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize').Sequelize;

db.User = User;
db.Role = Role;
db.Permission = Permission;


// Chama associações
Role.associate(db);
Permission.associate(db);
User.associate(db);

export default db;