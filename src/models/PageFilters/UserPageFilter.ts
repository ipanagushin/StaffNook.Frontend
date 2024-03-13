import { IBasePageFilter } from "./BasePageFilter";

export interface IUserPageFilter extends IBasePageFilter {
  specialityId?: string;
  phoneNumber?: string;
  fullName?: string;
}
