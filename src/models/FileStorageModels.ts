export interface IFileDto {
  Id: string;
  Bucket: FileStorageBucketEnum;
  BucketName: string;
  Path: string;
  Name: string;
  PreviewUrl: string;
}

export enum FileStorageBucketEnum {
  Temp = 0,
  Permanent = 1,
}
