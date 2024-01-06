export interface ILoginRequest {
  login: string;
  password: string;
}

export interface IChangePasswordRequest {
  userId: string;
  currentPassword?: string;
  newPassword: string;
}
