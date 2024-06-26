import { AlertColor } from "@mui/material";

export class AlertState {
  constructor(message: string, variant: AlertColor) {
    this.Message = message;
    this.Variant = variant;
  }

  Message: string;
  Variant: AlertColor;
}

export const LoginSuccessfulConstant = new AlertState(
  "Вход выполнен успешно",
  "success"
);
export const ClipboardCopiedConstant = new AlertState(
  "Отчет скопирован в буфер обмена",
  "info"
);
export const ChangeWorkLogSuccessConstant = new AlertState(
  "Отчёт успешно изменен",
  "success"
);
export const ChangeWorkLogErrorConstant = new AlertState(
  "Произошла ошибка при изменении отчета",
  "error"
);
export const DeleteWorkLogSuccessConstant = new AlertState(
  "Отчёт успешно удалён",
  "success"
);
export const DeleteWorkLogErrorConstant = new AlertState(
  "Произошла ошибка при удалении отчета",
  "error"
);
export const CreateWorkLogSuccessConstant = new AlertState(
  "Отчёт успешно создан",
  "success"
);
export const CreateWorkLogErrorConstant = new AlertState(
  "Произошла ошибка при создании отчета",
  "error"
);

export const CreateUserSuccessConstant = new AlertState(
  "Сотрудник успешно создан",
  "success"
);
export const CreateUserErrorConstant = new AlertState(
  "Произошла ошибка при создании сотрудника",
  "error"
);

export const UpdateUserSuccessConstant = new AlertState(
  "Изменения в сотруднике успешно сохранены",
  "success"
);
export const UpdateUserErrorConstant = new AlertState(
  "Произошла ошибка при сохранении изменений сотрудника",
  "error"
);

export const DeleteUserSuccessConstant = new AlertState(
  "Сотрудник успешно удалён",
  "success"
);
export const DeleteUserErrorConstant = new AlertState(
  "Произошла ошибка при удалении сотрудника",
  "error"
);

export const ChangePasswordSuccessConstant = new AlertState(
  "Пароль сотрудника успешно изменен",
  "success"
);

export const ChangePasswordErrorConstant = new AlertState(
  "Произошла ошибка при изменении пароля сотрудника",
  "error"
);

/* Новости */

export const CreateNewsSuccessConstant = new AlertState(
  "Новость успешно создана",
  "success"
);

export const CreateNewsErrorConstant = new AlertState(
  "Произошла ошибка при создании новости",
  "error"
);

export const UpdateNewsSuccessConstant = new AlertState(
  "Новость успешно изменена",
  "success"
);

export const UpdateNewsErrorConstant = new AlertState(
  "Произошла ошибка при изменении новости",
  "error"
);

export const DeleteNewsSuccessConstant = new AlertState(
  "Новость успешно удалёна",
  "success"
);
export const DeleteNewsErrorConstant = new AlertState(
  "Произошла ошибка при удалении новости",
  "error"
);

/* Проекты */

export const CreateProjectSuccessConstant = new AlertState(
  "Проект успешно создан",
  "success"
);
export const CreateProjectErrorConstant = new AlertState(
  "Произошла ошибка при создании проекта",
  "error"
);

export const DeleteProjectSuccessConstant = new AlertState(
  "Проект успешно удалён",
  "success"
);
export const DeleteProjectErrorConstant = new AlertState(
  "Произошла ошибка при удалении проекта",
  "error"
);

/* Клиенты */

export const CreateClientSuccessConstant = new AlertState(
  "Клиент успешно создан",
  "success"
);

export const CreateClientErrorConstant = new AlertState(
  "Произошла ошибка при создании клиента",
  "error"
);

export const UpdateClientSuccessConstant = new AlertState(
  "Клиент успешно изменен",
  "success"
);

export const UpdateClientErrorConstant = new AlertState(
  "Произошла ошибка при изменении клиента",
  "error"
);

export const DeleteClientSuccessConstant = new AlertState(
  "Клиент успешно удалён",
  "success"
);
export const DeleteClientErrorConstant = new AlertState(
  "Произошла ошибка при удалении клиента",
  "error"
);

/* Отчеты */

export const DeleteTimeReportSuccessConstant = new AlertState(
  "Отчет успешно удалён",
  "success"
);
export const DeleteTimeReportErrorConstant = new AlertState(
  "Произошла ошибка при удалении отчета",
  "error"
);

/* Стандартные ошибки */

export const FetchErrorConstant = new AlertState(
  "Произошла ошибка при получении данных",
  "error"
);
export const GenericErrorConstant = new AlertState(
  "Упс... Что-то пошло не так",
  "error"
);
