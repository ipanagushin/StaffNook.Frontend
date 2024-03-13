export interface IPaginationResult<T> {
  items: T[];
  pageInfo: IPageInfo;
}

export interface IPageInfo {
  totalCount: number;
  currentPage: number;
  totalPageCount: number;
}
