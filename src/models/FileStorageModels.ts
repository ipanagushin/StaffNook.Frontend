export interface IFileDto {
  id: string;
  bucket: FileStorageBucketEnum;
  bucketName: string;
  path: string;
  name: string;
  previewUrl: string;
}

export enum FileStorageBucketEnum {
  Temp = 0,
  Permanent = 1,
}
