export interface IRoleInfoDto {
  name?: string;
  claims?: string[];
  id: string;
  createDate?: string;
  updateDate?: string;
  isArchived?: boolean;
}

export interface IEditRoleDto {
  name?: string;
  claims?: string[];
}
