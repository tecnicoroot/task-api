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
    
}

export default new RolesService();