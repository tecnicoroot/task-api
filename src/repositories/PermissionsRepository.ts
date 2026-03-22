import Permission from "../models/Permission";

class PermissionsRepository {
    async findAll(){
        return Permission.findAll();
    };

    async findById(id: number){ 
        return Permission.findByPk(id)

    };

    async findByName(name: string) {
    return Permission.findOne({
      where: { name }
    });
  }

    async create(data: any){
        return Permission.create(data)
    };

    async update(permission: any, data: any){
        return permission.update(data);
    };

    async delete(permission: any){
        return permission.destroy();
    };

}

export default new PermissionsRepository();
