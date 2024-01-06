import { IFileDto } from "./FileStorageModels";

export interface ICreateUserRequest {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  login?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  attachment?: IFileDto;
  roleId?: string;
  dateOfBirth?: string;
}

export interface IUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  login?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  attachment?: IFileDto;
  roleId?: string;
  dateOfBirth?: string;
}

export interface IUserInfoDto {
  id?: string;
  login?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  roleId?: string;
  email?: string;
  attachment?: IFileDto;
  dateOfBirth?: string;
}
