export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  middleName: string;
  login: string;
  password: string;
  email: string;
  phoneNumber: string;
  attachmentId: string;
  roleId: string;
}

export interface IUserInfoDto {
  id?: string;
  login?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  role?: string;
  email?: string;
  attachmentId?: string | null;
}
