import { ReferenceType } from "@/common/ReferenceType";
import {
  IReferenceCreateModel,
  IReferenceUpdateModel,
} from "@/models/ReferenceModels";
import { IAvailableValue } from "@/models/AvailableValue";
import API from "@/utils/API";

class ReferenceDataService {
  getByType(type: ReferenceType) {
    return API.get<IAvailableValue[]>(`/references/${type}`);
  }

  addReference(type: ReferenceType, availableValue: IAvailableValue) {
    let refCreate: IReferenceCreateModel = {
      name: availableValue.name,
    };

    return API.post<IAvailableValue>(`/references/${type}`, refCreate);
  }

  updateReference(type: ReferenceType, availableValue: IAvailableValue) {
    let refUpdate: IReferenceUpdateModel = {
      name: availableValue.name,
    };

    return API.put<IAvailableValue>(
      `/references/${type}/${availableValue.value}`,
      refUpdate
    );
  }
}

export default new ReferenceDataService();
