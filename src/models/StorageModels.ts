export interface ITokenInfo {
  token: string;
  expiresIn: number;
}

export interface ICurrentUserInfo {
  id: string;
  roleId: string;
  isAdmin: boolean;
  login: string;
  email: string;
  fullName: string;
  avatarLink?: string;
  // avatarId: string,
}

export interface IValueWithExpires<T> {
  value: T;
  expires: Date | null;
}
