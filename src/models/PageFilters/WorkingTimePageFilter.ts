import { IBasePageFilter } from "./BasePageFilter";

export interface IWorkingTimePageFilter extends IBasePageFilter {
  projectId?: string;
  userId?: string | null;
}
