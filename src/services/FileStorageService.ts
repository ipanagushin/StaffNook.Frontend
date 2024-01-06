import { FileStorageBucketEnum, IFileDto } from "@/models/FileStorageModels";
import api from "@/utils/FileAPI";

class FileStorageService {
  getById(attachmentId: string) {
    return api.get(`api/v1/storage/${attachmentId}`);
  }

  upload(
    filePath: string,
    fileStorageBucket: FileStorageBucketEnum,
    file: File
  ) {
    const formData = new FormData();
    formData.append("file", file);
    return api.post<IFileDto>(
      `api/v1/storage/upload?filePath=${filePath}&fileStorageBucket=${fileStorageBucket}`,
      formData
    );
  }

  delete(id: string, soft: boolean) {
    return api.delete(`api/v1/storage/${id}/delete?soft=${soft}`);
  }
}

export default new FileStorageService();
