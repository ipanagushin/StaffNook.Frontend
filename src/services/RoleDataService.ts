import { IRoleInfoDto } from "@/models/RoleModels";
import API from "@/utils/API";

class UserDataService {
  getAllRoles() {
    return API.get<IRoleInfoDto[]>("/role/list");
  }

  getById(id: string) {
    return API.get<IRoleInfoDto>(`/role/${id}`);
  }

  delete(id: string) {
    return API.delete(`/role/${id}`);
  }
}

export default new UserDataService();
