export interface IBaseInfoDto {
  /** Идентификатор */
  id: string;

  /** Дата создания */
  createdAt: string;

  /** Создатель */
  creatorId: string | null;

  /** Дата обновления */
  updatedAt: string;

  /** Архивная запись */
  isArchived: boolean;
}
