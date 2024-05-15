import { IAvailableValue } from "@/models/AvailableValue";
import { IUserPageFilter } from "@/models/PageFilters/UserPageFilter";
import { IUserProjectHistoryPageFilter } from "@/models/PageFilters/UserProjectHistoryPageFilter";
import { IPaginationResult } from "@/models/PaginationModel";
import {
  ICreateUserRequest,
  IShortUserInfoDto,
  IUserInfoDto,
  IUserProjectHistoryDto,
} from "@/models/UserModels";
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

  getAdminByPageFilter(pageNumber: number, pageSize: number) {
    const filter = {
      PageSize: pageSize,
      PageNumber: pageNumber,
    };

    return API.post<IPaginationResult<IUserInfoDto>>("/user/filter", filter);
  }

  getAvailableValues() {
    return API.get<IAvailableValue[]>(`/user/availableValues`);
  }

  getByPageFilter(filter: IUserPageFilter) {
    return API.post<IPaginationResult<IShortUserInfoDto>>(
      "/user/employments",
      filter
    );
  }

  getProjectHistoryByPageFilter(filter: IUserProjectHistoryPageFilter) {
    return API.post<IPaginationResult<IUserProjectHistoryDto>>(
      "/user/employments/project/history",
      filter
    );
  }

  delete(id: string) {
    return API.delete(`/user/${id}`);
  }
}

export default new UserDataService();
