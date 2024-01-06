import { ChangeEvent, useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { IUserInfoDto } from "@/models/UserModels";
import UserDataService from "@/services/UserDataService";
import _ from "lodash";
import ContainerLoader from "@/components/ContainerLoader";
import RoleDataService from "@/services/RoleDataService";
import { IRoleInfoDto } from "@/models/RoleModels";
import AvatarImageUploader from "@/components/FileUploader/AvatarImageUploader";
import { IFileDto } from "@/models/FileStorageModels";
import FileStorageService from "@/services/FileStorageService";
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';

interface IProps {
  userId?: string;
  onClose: () => void;
  onRefresh: () => void;
  showModal: boolean;
}

const UserEditModal = (modalInfo: IProps) => {
  const [user, setUser] = useState<IUserInfoDto | undefined>();
  const [isLoad, setIsLoad] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [roles, setRoles] = useState<IRoleInfoDto[]>([]);
  const [filesError, setFilesError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [defaultPickedFiles, setDefaultPickedFiles] = useState<IFileDto[]>([]);
  const setAlertMessage = useSetRecoilState(alertState);

  const handleFilePickChange = (files: IFileDto[]) => {
    setUser(ref => ({
        ...ref,
        attachment: files[0]
    }))
  }

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value || value.trim() === "") {
      setLoginError(true);
    } else {
      setLoginError(false);
    }

    setUser((ref) => ({
      ...ref,
      login: value,
    }));
  };

  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDateOfBirthError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, dateOfBirth: value }));
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value || value.trim() === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    setUser((ref) => ({
      ...ref,
      firstName: value,
    }));
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value || value.trim() === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }

    setUser((ref) => ({
      ...ref,
      lastName: value,
    }));
  };

  const handleMiddleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMiddleNameError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, middleName: value }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Ваша логика валидации, если необходимо
    setEmailError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, email: value }));
  };

  const handleRoleChange = (event: MuiMaterial.SelectChangeEvent) => {
    const value = event.target.value as string;
    setRoleError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, roleId: value }));
  };

  const handleClose = () => {
    setUser(undefined);
    modalInfo.onClose();
    setLoginError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setMiddleNameError(false);
    setEmailError(false);
    setRoleError(false);
    setDefaultPickedFiles([]);
    setFilesError(false);
    setDateOfBirthError(false);
  };

  const onSaveUser = () => {
    const postAct = () => {
        setUser(undefined);
        modalInfo.onClose();
        modalInfo.onRefresh();
        setLoginError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setMiddleNameError(false);
        setEmailError(false);
        setRoleError(false);
        setDefaultPickedFiles([]);
        setFilesError(false);
        setDateOfBirthError(false);
        setAlertMessage(SystemAlertConstants.UpdateUserSuccessConstant);
    };

    if (!user?.login || user?.login.trim() === "") {
      setLoginError(true);
      return;
    }

    if (!user?.firstName || user?.firstName.trim() === "") {
      setFirstNameError(true);
      return;
    }

    if (!user?.lastName || user?.lastName.trim() === "") {
      setLastNameError(true);
      return;
    }

    if (!user?.lastName || user?.lastName.trim() === "") {
        setLastNameError(true);
        return;
    }

  //   if (!user?.attachment) {
  //     setFilesError(true);
  //     return;
  // }

    //todo логика валидации для middleName, email, и roleId

    if (user) {
      UserDataService.updateUser(modalInfo.userId!, user)
      .then(postAct)
      .catch(()=>setAlertMessage(SystemAlertConstants.UpdateUserErrorConstant));
    }
  };

  useEffect(()=>{
    const fetchRoles = async () => {
        try {
          const response = await RoleDataService.getAllRoles();
          setRoles(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchRoles();
  },[])

  useEffect(() => {
    setIsLoad(true);
    setUser(undefined);

    const fetchUser = async () => {
      if (!_.isUndefined(modalInfo.userId) && modalInfo.showModal) {
        try {
          const response = await UserDataService.getUserById(modalInfo.userId);
          setUser(response.data);
          if(response.data.attachment){
            let attachment = await FileStorageService.getById(response.data.attachment.id);
            setDefaultPickedFiles([attachment.data]);
        }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser()
      .then(() => setIsLoad(false))
      .catch(console.error);
  }, [modalInfo.userId, modalInfo.showModal]);

  return (
    <>
      <ContainerLoader Loading={isLoad}>
        <MuiMaterial.Dialog
          open={modalInfo.showModal}
          fullWidth={true}
          maxWidth={'xs'}
        >
          <MuiMaterial.DialogTitle>
            {_.isUndefined(modalInfo.userId) ? "Создание сотрудника" : "Редактирование сотрудника"}
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
            <MuiMaterial.Stack spacing={2}>
              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel required>Логин</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user?.login}
                  onChange={handleLoginChange}
                  error={loginError}
                  helperText={loginError && "Поле не может быть пустым"}
                />
              </MuiMaterial.FormControl>

              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel required>Email</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user?.email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError && "Некорректный email"}
                />
              </MuiMaterial.FormControl>

              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel required>Имя</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user?.firstName}
                  onChange={handleFirstNameChange}
                  error={firstNameError}
                  helperText={firstNameError && "Поле не может быть пустым"}
                />
              </MuiMaterial.FormControl>

              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel required>Фамилия</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user?.lastName}
                  onChange={handleLastNameChange}
                  error={lastNameError}
                  helperText={lastNameError && "Поле не может быть пустым"}
                />
              </MuiMaterial.FormControl>

              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel>Отчество</MuiMaterial.FormLabel>
                <MuiMaterial.TextField
                  variant="standard"
                  value={user?.middleName}
                  onChange={handleMiddleNameChange}
                  error={middleNameError}
                  helperText={middleNameError && "Поле не может быть пустым"}
                />
              </MuiMaterial.FormControl>

              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel required>Роль</MuiMaterial.FormLabel>
                <MuiMaterial.Select
                  variant="outlined"
                  value={user?.roleId || ""}
                  onChange={handleRoleChange}
                  error={roleError}
                  displayEmpty
                >
                  <MuiMaterial.MenuItem value="" disabled>
                    Выберите роль
                  </MuiMaterial.MenuItem>
                  {roles.map((role) => (
                    <MuiMaterial.MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MuiMaterial.MenuItem>
                  ))}
                </MuiMaterial.Select>
                {roleError && <MuiMaterial.FormHelperText error>Выберите роль</MuiMaterial.FormHelperText>}
              </MuiMaterial.FormControl>

              <MuiMaterial.TextField
                  label="Дата рождения"
                  variant="standard"
                  size="small"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={new Date(user?.dateOfBirth!)}
                  // value={user?.dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  error={dateOfBirthError}
                  helperText={dateOfBirthError && "Поле не может быть пустым"}
                />

              <MuiMaterial.FormControl>
                  <MuiMaterial.FormLabel required>Аватар</MuiMaterial.FormLabel>
                  <AvatarImageUploader onChange={handleFilePickChange} Files={defaultPickedFiles} filePath='avatar'/>
                  {filesError && (
                      <MuiMaterial.Typography color={'red'} variant="caption">Файл должен быть прикреплён</MuiMaterial.Typography>
                  )}
              </MuiMaterial.FormControl>

              <MuiMaterial.Button variant="outlined" onClick={onSaveUser}>
                Сохранить
              </MuiMaterial.Button>
            </MuiMaterial.Stack>
          </MuiMaterial.DialogContent>
        </MuiMaterial.Dialog>
      </ContainerLoader>
    </>
  );
};

export default UserEditModal;
