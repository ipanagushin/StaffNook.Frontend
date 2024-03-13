import {
  ICreateNewsDto,
  INewsInfoDto,
  IUpdateNewsDto,
} from "@/models/NewsModels";
import { INewsPageFilter } from "@/models/PageFilters/NewsPageFilter";
import { IPaginationResult } from "@/models/PaginationModel";
import API from "@/utils/API";

class NewsDataService {
  // getAllNews() {
  //   return API.get<INewsInfoDto[]>("/news/list");
  // }

  createNews(news: ICreateNewsDto) {
    return API.post("/news", news);
  }

  updateNews(id: string, news: IUpdateNewsDto) {
    return API.put(`/news/${id}`, news);
  }

  getNewsById(id: string) {
    return API.get<INewsInfoDto>(`/news/${id}`);
  }

  getByPageFilter(filter: INewsPageFilter) {
    return API.post<IPaginationResult<INewsInfoDto>>("/news/filter", filter);
  }

  delete(id: string) {
    return API.delete(`/news/${id}`);
  }
}

export default new NewsDataService();
