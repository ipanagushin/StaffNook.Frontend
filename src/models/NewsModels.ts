import { IBaseInfoDto } from "./BaseInfoModel";

export interface INewsInfoDto extends IBaseInfoDto {
  /** Заголовок */
  title: string;

  /** Описание */
  description: string;
}

export interface ICreateNewsDto {
  /** Заголовок */
  title: string;

  /** Описание */
  description: string;
}

export interface IUpdateNewsDto {
  /** Заголовок */
  title: string;

  /** Описание */
  description: string;
}
