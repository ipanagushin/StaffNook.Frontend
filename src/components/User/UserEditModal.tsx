import React, { ChangeEvent, useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { IUserInfoDto } from "@/models/UserModels";
import InterestsList from "@/components/User/InterestsList";
import { IFileDto } from "@/models/FileStorageModels";
import PhoneInput from "../PhoneInput";
import AvatarImageUploader from "../FileUploader/AvatarImageUploader";
import UserDataService from "@/services/UserDataService";

interface IProps {
  user: IUserInfoDto;
  onClose: () => void;
  showModal: boolean;
}

const UserEditModal: React.FC<IProps> = ({ user, onClose, showModal }) => {

    const [userInfo, setUserInfo] = useState<IUserInfoDto>(user);
    const [defaultPickedFiles, setDefaultPickedFiles] = useState<IFileDto[]>([]);
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
      setUserInfo(user);
      setPhone(user.phoneNumber!);
      setEmail(user.email!);
      if(user.attachment){
        setDefaultPickedFiles([user.attachment]);
    }
    }, [user]);

  const handleClose = () => {
    onClose();
    setDefaultPickedFiles([]);
  };

  const onSaveUser = () => {
    UserDataService.updateUser(userInfo.id!, userInfo).then(() => {
        handleClose();
    })
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setUserInfo((prevUser) => ({ ...prevUser, email: value }));
  };


  const handleInputPhoneChange = (value: string) => {
    if(value.length === 11 && userInfo.phoneNumber !== value) {
        setPhone(value);
        setUserInfo(prevUser => ({ ...prevUser, phoneNumber: value }));
    }
  };

  const handleFilePickChange = (files: IFileDto[]) => {
    setUserInfo(ref => ({
        ...ref,
        attachment: files[0]
    }))
  }

  return (
    <>
      <MuiMaterial.Dialog open={showModal} fullWidth={true} maxWidth={"lg"}>
        <MuiMaterial.DialogTitle>
          Просмотр профиля пользователя: {user.lastName} {user.firstName}{" "}
          {user.middleName}
          <MuiMaterial.IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <MuiIcon.Close />
          </MuiMaterial.IconButton>
        </MuiMaterial.DialogTitle>
        <MuiMaterial.DialogContent>
            <MuiMaterial.Grid container>
                <MuiMaterial.Grid item xs={12} md={6}>
                <MuiMaterial.FormControl>
                  <MuiMaterial.FormLabel required>Аватар</MuiMaterial.FormLabel>
                  <AvatarImageUploader onChange={handleFilePickChange} Files={defaultPickedFiles} filePath='avatar'/>
              </MuiMaterial.FormControl>
                </MuiMaterial.Grid>
            <MuiMaterial.Grid item xs={12} md={6}>
            <MuiMaterial.Grid container spacing={3}>
            

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Имя</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user.firstName}
                  disabled
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Фамилия</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user.lastName}
                  disabled
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Отчество</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user.middleName}
                  disabled
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Email</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={email}
                  onChange={handleEmailChange}
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth >
                <PhoneInput onChange={handleInputPhoneChange} value={phone}/>
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Дата рождения</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={
                    user.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString("ru-RU")
                      : ""
                  }
                  disabled
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Специальность</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user.specialityName || "Не указано"}
                  disabled
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={4}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Дата приема</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={
                    user.employmentDate
                      ? new Date(user.employmentDate).toLocaleDateString("ru-RU")
                      : ""
                  }
                  disabled
                />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

          </MuiMaterial.Grid>
                </MuiMaterial.Grid>
                <MuiMaterial.Grid item xs={12}>
              <MuiMaterial.FormControl fullWidth>
                <MuiMaterial.FormLabel>Интересы</MuiMaterial.FormLabel>
                <InterestsList interests={user.interests} />
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>
            </MuiMaterial.Grid>
          
        </MuiMaterial.DialogContent>
        <MuiMaterial.DialogActions>
          <MuiMaterial.Button onClick={onSaveUser}>Сохранить</MuiMaterial.Button>
        </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    </>
  );
};

export default UserEditModal;
