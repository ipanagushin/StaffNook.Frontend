import { IBasePageFilter } from "./BasePageFilter";

export interface IUserProjectHistoryPageFilter extends IBasePageFilter {
  userId?: string | null;
}
