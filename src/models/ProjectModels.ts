import { IBaseInfoDto } from "./BaseInfoModel";

export interface ICreateProjectDto {
  /**
   * Название проекта
   */
  name?: string;

  /**
   * Руководитель проекта
   */
  userId?: string;

  /**
   * Клиент (заказчик)
   */
  clientId?: string;

  /**
   * Дата начала
   */
  startDate?: string;

  /**
   * Дата окончания
   */
  endDate?: string;

  /**
   * Тип проекта
   */
  projectTypeId?: string;

  /**
   * Контакты проекта
   */
  contacts?: IProjectContactDto[];

  /**
   * Роли на проекте
   */
  roles?: IProjectRoleDto[];
}

export interface IProjectContactDto {
  /**
   * Имя
   */
  firstName?: string;

  /**
   * Фамилия
   */
  lastName?: string;

  /**
   * Email адрес
   */
  emailAddress?: string;

  /**
   * Дополнительная информация
   */
  additionalInformation?: string;

  /**
   * Проект
   */
  projectId?: string;
}

export interface IProjectRoleDto {
  /**
   * Наименование
   */
  name?: string;

  /**
   * Ставка за час
   */
  hourlyFee?: number;

  /**
   * Проект
   */
  projectId?: string;
}

export interface IProjectEmployeeDto {
  /**
   * Сотрудник
   */
  userId: string;

  /**
   * Роль на проекте
   */
  projectRoleId: string;

  /**
   * Проект
   */
  projectId?: string;
}

export interface IProjectInfoDto extends IBaseInfoDto {
  /**
   * Название проекта
   */
  name: string;

  /**
   * Руководитель проекта
   */
  userId: string;

  /**
   * Руководитель проекта
   */
  userName: string;

  /**
   * Клиент (заказчик)
   */
  clientId: string;

  /**
   * Клиент (заказчик)
   */
  clientName: string;

  /**
   * Дата начала
   */
  startDate: string;

  /**
   * Дата окончания
   */
  endDate: string;

  /**
   * Тип проекта
   */
  projectTypeId: string;

  /**
   * Название типа проекта
   */
  projectTypeName: string;

  /**
   * Контакты проекта
   */
  projectContacts: IProjectContactDto[];

  /**
   * Роли на проекте
   */
  projectRoles: IProjectRoleDto[];

  /**
   * Сотрудники на проекте
   */
  projectEmployees: IProjectEmployeeDto[];
}
