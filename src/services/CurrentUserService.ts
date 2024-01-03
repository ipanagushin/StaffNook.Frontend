import { ITokenInfo, ICurrentUserInfo } from "../models/StorageModels";
import DataStorage from "../utils/DataStorage";

class CurrentUserService {
  private userTokenKey = "userToken";
  private userInfoKey = "userInfo";

  public getUserInfo(): ICurrentUserInfo | null {
    return DataStorage.get<ICurrentUserInfo>(this.userInfoKey) ?? null;
  }

  public setUserInfo(userInfo: ICurrentUserInfo): void {
    DataStorage.set<ICurrentUserInfo>(this.userInfoKey, userInfo);
  }

  public getUserToken(): ITokenInfo | null {
    return DataStorage.get<ITokenInfo>(this.userTokenKey) ?? null;
  }

  public setUserToken(token: ITokenInfo): void {
    DataStorage.set<ITokenInfo>(
      this.userTokenKey,
      token,
      Number(token.expiresIn)
    );
  }

  public userTokenExist(): boolean {
    return DataStorage.exist(this.userTokenKey);
  }

  public clearAllUserData(): void {
    DataStorage.remove(this.userTokenKey);
    DataStorage.remove(this.userInfoKey);
  }
}

export default new CurrentUserService();
