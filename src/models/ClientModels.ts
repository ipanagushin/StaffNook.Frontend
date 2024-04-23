import { IBaseInfoDto } from "./BaseInfoModel";

export interface ICreateClientDto {
  /** Полное название */
  name: string;
  
  /** Короткое название */
  shortName: string;
}

export interface IUpdateClientDto {
  /** Полное название */
  name: string;
  
  /** Короткое название */
  shortName: string;
}

export interface IClientInfoDto extends IBaseInfoDto {
    /** Полное название */
    name: string;
  
    /** Короткое название */
    shortName: string;
}
