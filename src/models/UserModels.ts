import { IFileDto } from "./FileStorageModels";
import { IInterestInfoDto } from "./InterestModels";

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
  employmentDate?: string;
  specialityId?: string;
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
  employmentDate?: string;
  specialityId?: string;
}

export interface IUserInfoDto {
  id?: string;
  login?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  roleId?: string;
  roleName?: string;
  email?: string;
  attachment?: IFileDto;
  dateOfBirth?: string;
  employmentDate?: string;
  specialityId?: string;
  specialityName?: string;
  phoneNumber?: string;
  interests?: IInterestInfoDto[];
}

export interface IShortUserInfoDto {
  id: string;
  fullName: string;
  specialityName?: string;
  employmentDate: string;
  attachment: IFileDto;
}

export interface IUserProjectHistoryDto {
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  projectRoleId: string;
  projectRoleName: string;
  workingTime: number;
  startDate: string;
  endDate: string;
}
