import db from '../models';
const { User, Role } = db;

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

  async addRoles(userId: number, rolesIds: number[]) {
    const user = await User.findByPk(userId);

    if (!user) throw new Error("Perfil não encontrado");

    // ✅ Agora setPermissions existe
    await user.addRoles(rolesIds);

    return await user.getRoles({ attributes: ['id', 'name'] });
  }

  async showRolesById(userId: number) {
    const user = await User.findByPk(userId, {
      include: { model: Role, as: 'roles', attributes: ['id', 'name'] }
    });

    if (!user) throw new Error("Usuário não encontrado");

    return user.roles;
  }

}

export default new UsersRepository();