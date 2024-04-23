import { IClientPageFilter } from "@/models/PageFilters/ClientPageFilter";
import { IPaginationResult } from "@/models/PaginationModel";
import { ICreateClientDto, IUpdateClientDto, IClientInfoDto } from "@/models/ClientModels";
import API from "@/utils/API";
import { IAvailableValue } from "@/models/AvailableValue";

class ClientDataService {
  createClient(client: ICreateClientDto) {
    return API.post("/client", client);
  }

  updateClient(id: string, client: IUpdateClientDto) {
    return API.put(`/client/${id}`, client);
  }

  getClientById(id: string) {
    return API.get<IClientInfoDto>(`/client/${id}`);
  }

  getByPageFilter(filter: IClientPageFilter) {
    return API.post<IPaginationResult<IClientInfoDto>>(
      "/client/filter",
      filter
    );
  }

  getAvailableValues(){
    return API.get<IAvailableValue[]>(`/client/availableValues`);
  }

  delete(id: string) {
    return API.delete(`/client/${id}`);
  }
}

export default new ClientDataService();
