import db from '../models';
const { Role, Permission } = db;

class RolesRepository {
    async findAll() {
      return Role.findAll({
        include: { model: Permission, as: 'permissions', attributes: ['id', 'name'] }
      });
    }

    async findById(id: number){ 
        return Role.findByPk(id)

    };

    async findByName(name: string) {
    return Role.findOne({
      where: { name }
    });
  }

    async create(data: any){
        return Role.create(data)
    };

    async update(role: any, data: any){
        return role.update(data);
    };

    async delete(role: any){
        return role.destroy();
    };

    async addPermissions(roleId: number, permissionIds: number[]) {
    const role = await Role.findByPk(roleId);

    if (!role) throw new Error("Perfil não encontrado");

    // ✅ Agora setPermissions existe
    await role.addPermissions(permissionIds);

    return await role.getPermissions({ attributes: ['id', 'name'] });
  }

  async showPermissionById(roleId: number) {
    const role = await Role.findByPk(roleId, {
      include: { model: Permission, as: 'permissions', attributes: ['id', 'name'] }
    });

    return role?.permissions ?? [];
  }
}

export default new RolesRepository();
