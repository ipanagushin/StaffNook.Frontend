import { IPaginationResult } from "@/models/PaginationModel";
import { ICreateUserRequest, IUserInfoDto } from "@/models/UserModels";
import API from "@/utils/API";

class UserDataService {
  getAllUsers() {
    return API.get<IUserInfoDto[]>("/user/list");
  }

  createUser(user: ICreateUserRequest) {
    return API.post("/user", user);
  }

  updateUser(id: string, user: ICreateUserRequest) {
    return API.put(`/user/${id}`, user);
  }

  getUserById(id: string) {
    return API.get<IUserInfoDto>(`/user/${id}`);
  }

  getByPageFilter(pageNumber: number, pageSize: number) {
    const filter = {
      PageSize: pageSize,
      PageNumber: pageNumber,
    };

    return API.post<IPaginationResult<IUserInfoDto>>("/user/filter", filter);
  }

  delete(id: string) {
    return API.delete(`/user/${id}`);
  }
}

export default new UserDataService();
