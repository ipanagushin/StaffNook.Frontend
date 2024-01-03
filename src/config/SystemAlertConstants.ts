import { AlertColor } from "@mui/material";

export class AlertState {
    constructor(message: string, variant: AlertColor) {
        this.Message = message;
        this.Variant = variant;
    }

    Message: string;
    Variant: AlertColor;
}

export const LoginSuccessfulConstant = new AlertState('Вход выполнен успешно', 'success');
export const ClipboardCopiedConstant = new AlertState('Отчет скопирован в буфер обмена', 'info');
export const ChangeWorkLogSuccessConstant = new AlertState('Отчёт успешно изменен', 'success');
export const ChangeWorkLogErrorConstant = new AlertState('Произошла ошибка при изменении отчета', 'error');
export const DeleteWorkLogSuccessConstant = new AlertState('Отчёт успешно удалён', 'success');
export const DeleteWorkLogErrorConstant = new AlertState('Произошла ошибка при удалении отчета', 'error');
export const CreateWorkLogSuccessConstant = new AlertState('Отчёт успешно создан', 'success');
export const CreateWorkLogErrorConstant = new AlertState('Произошла ошибка при создании отчета', 'error');
export const FetchErrorConstant = new AlertState('Произошла ошибка при получении данных', 'error');
export const GenericErrorConstant = new AlertState('Упс... Что-то пошло не так', 'error');