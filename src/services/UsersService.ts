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