import User from "../models/User";

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

}

export default new UsersRepository();