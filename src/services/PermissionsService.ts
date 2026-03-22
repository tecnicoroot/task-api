import PermissionsRepository from "../repositories/PermissionsRepository";

class permissionsService{

  async listPermissions() {
    return PermissionsRepository.findAll();
  }

  async getPermission(id: number) {

    const permission = await PermissionsRepository.findById(id);

    if (!permission) {
      throw new Error("Usuário não encontrado");
    }

    return permission;
  }

  async createPermission(data: any) {

    const nameExists = await PermissionsRepository.findByName(data.name);

    if (nameExists) {
      throw new Error("Permissão já cadastrado");
    }

    return PermissionsRepository.create(data);
  }

  async updatePermission(id: number, data: any) {

    const permission = await PermissionsRepository.findById(id);

    if (!permission) {
      throw new Error("Permissão não encontrado");
    }

    return PermissionsRepository.update(permission, data);
  }

  async deletePermission(id: number) {

    const permission = await PermissionsRepository.findById(id);

    if (!permission) {
      throw new Error("Permissão não encontrado");
    }

    await PermissionsRepository.delete(permission);
  }
    
}

export default new permissionsService();