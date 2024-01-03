import { ILoginRequest } from "@/models/IdentityModels";
import { ITokenInfo, ICurrentUserInfo } from "@/models/StorageModels";
import API from "@/utils/API";

class IdentityService {
  login(loginRequest: ILoginRequest) {
    return API.post<ITokenInfo>("/identity/login", loginRequest);
  }

  getCurrentUserInfo() {
    return API.get<ICurrentUserInfo>("/identity/currentUser");
  }
}

export default new IdentityService();
