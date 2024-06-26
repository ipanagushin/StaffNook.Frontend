import {
    ICreateWorkingTimeDto,
    IUpdateWorkingTimeDto,
    IWorkingTimeCalendarDto,
    IWorkingTimeInfoDto,
  } from "@/models/WorkingTimeModels";
  import { IWorkingTimePageFilter } from "@/models/PageFilters/WorkingTimePageFilter";
  import { IPaginationResult } from "@/models/PaginationModel";
  import API from "@/utils/API";
  
  class WorkingTimeDataService {
    createWorkingTime(workingTime: ICreateWorkingTimeDto) {
      return API.post("/working-time", workingTime);
    }
  
    updateWorkingTime(id: string, workingTime: IUpdateWorkingTimeDto) {
      return API.put(`/working-time/${id}`, workingTime);
    }
  
    getWorkingTimeById(id: string) {
      return API.get<IWorkingTimeInfoDto>(`/working-time/${id}`);
    }
  
    getByPageFilter(filter: IWorkingTimePageFilter) {
      return API.post<IPaginationResult<IWorkingTimeInfoDto>>(
        "/working-time/filter",
        filter
      );
    }
  
    deleteWorkingTime(id: string) {
      return API.delete(`/working-time/${id}`);
    }

    getByDate(date: string) {
      return API.get<IWorkingTimeInfoDto[]>(`/working-time/date/${date}`);
    }

    getCalendarByDates(from:string, to:string){
      return API.get<IWorkingTimeCalendarDto>(`/working-time/calendar/${from}/${to}`);
    }
  }
  
  export default new WorkingTimeDataService();
  