import * as MuiMaterial from "@mui/material";
import { useState } from "react";

interface IProps{
    userId?: string,
    onClose: () => void,
    handleChangePassword: (userId?: string, password?: string) => void,
    showModal: boolean
}

const ChangePasswordModal = (modalInfo: IProps) =>{
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setNewPassword(value);
    }
    return(
        <MuiMaterial.Dialog maxWidth={'md'} open={modalInfo.showModal} onClose={() => modalInfo.onClose()}>
            <MuiMaterial.DialogTitle>Изменение пароля</MuiMaterial.DialogTitle>
            <MuiMaterial.DialogContent>
            <MuiMaterial.DialogContentText>
                Введите новый пароль для пользователя.
            </MuiMaterial.DialogContentText>
            <MuiMaterial.TextField variant="standard" type="password" fullWidth onChange={handlePasswordChange}/>
            </MuiMaterial.DialogContent>
            <MuiMaterial.DialogActions>
            <MuiMaterial.Button onClick={() => modalInfo.onClose()} autoFocus>Отмена</MuiMaterial.Button>
            <MuiMaterial.Button onClick={()=> {
                modalInfo.handleChangePassword(modalInfo.userId, newPassword);
                modalInfo.onClose();
            }}>
                Сохранить
            </MuiMaterial.Button>
            </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    )
}

export default ChangePasswordModal;