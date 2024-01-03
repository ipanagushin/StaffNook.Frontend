export interface IPaginationResult<T> {
  items: T[];
  pageInfo: IPageInfo;
}

interface IPageInfo {
  totalCount: number;
  currentPage: number;
  totalPageCount: number;
}
