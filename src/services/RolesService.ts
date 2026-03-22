import RolesRepository from "../repositories/RolesRepository";

class RolesService{

  async listRoles() {
    return RolesRepository.findAll();
  }

  async getRole(id: number) {

    const role = await RolesRepository.findById(id);

    if (!role) {
      throw new Error("Usuário não encontrado");
    }

    return role;
  }

  async createRole(data: any) {

    const nameExists = await RolesRepository.findByName(data.name);

    if (nameExists) {
      throw new Error("Perfil já cadastrado");
    }

    return RolesRepository.create(data);
  }

  async updateRole(id: number, data: any) {

    const role = await RolesRepository.findById(id);

    if (!role) {
      throw new Error("Perfil não encontrado");
    }

    return RolesRepository.update(role, data);
  }

  async deleteRole(id: number) {

    const role = await RolesRepository.findById(id);

    if (!role) {
      throw new Error("Perfil não encontrado");
    }

    await RolesRepository.delete(role);
  }

  async showPermissionById(id: number){
    const roles = await RolesRepository.showPermissionById(id)


    if (roles.length === 0) {
      throw new Error("Nenhuma permissão foi encontrada");
    }

    return roles;

  }

  async addPermissionsToRole(id: number, permissionsIds: number[]) {
    if (!Array.isArray(permissionsIds)) {
      throw new Error("Formato inválido");
    }

    const role = await RolesRepository.findById(id);

    if (!role) {
      throw new Error("Perfil não foi encontrado");
    }

    return RolesRepository.addPermissions(role.id, permissionsIds);
  }
}

export default new RolesService();