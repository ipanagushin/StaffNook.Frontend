import { IProjectPageFilter } from "@/models/PageFilters/ProjectPageFilter";
import { IPaginationResult } from "@/models/PaginationModel";
import { ICreateProjectDto, IProjectInfoDto, IUpdateProjectDto } from "@/models/ProjectModels";
import API from "@/utils/API";

class ProjectDataService {
  createProject(project: ICreateProjectDto) {
    return API.post("/project", project);
  }

  updateProject(id: string, project: IUpdateProjectDto) {
    return API.put(`/project/${id}`, project);
  }

  getProjectById(id: string) {
    return API.get<IProjectInfoDto>(`/project/${id}`);
  }

  getByPageFilter(filter: IProjectPageFilter) {
    return API.post<IPaginationResult<IProjectInfoDto>>(
      "/project/filter",
      filter
    );
  }

  delete(id: string) {
    return API.delete(`/project/${id}`);
  }
}

export default new ProjectDataService();
