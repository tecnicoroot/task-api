import User from "../models/User";
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

  async showRolesById(id: number){
      const user = await UsersRepository.showRolesById(id)
  
  
      if (user.length === 0) {
        throw new Error("Nenhum perfil foi encontrado");
      }
  
      return user;
  
    }
  
    async addRolesToUser(id: number, rolesIds: number[]) {
      if (!Array.isArray(rolesIds)) {
        throw new Error("Formato inválido");
      }
  
      const user = await UsersRepository.findById(id);
  
      if (!user) {
        throw new Error("Usurário não foi encontrado");
      }
  
      return UsersRepository.addRoles(user.id, rolesIds);
    }

}

export default new UsersService();