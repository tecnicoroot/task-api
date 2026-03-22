import Role from "../models/Role";

class RolesRepository {
    async findAll(){
        return Role.findAll();
    };

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

}

export default new RolesRepository();
