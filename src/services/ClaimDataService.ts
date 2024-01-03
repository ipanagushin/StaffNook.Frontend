import { IGroupedClaim } from "@/models/ClaimModels";
import API from "@/utils/API";

class ClaimDataService {
  getClaims() {
    return API.get<IGroupedClaim[]>("/claim");
  }
}

export default new ClaimDataService();
