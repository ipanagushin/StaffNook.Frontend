import { ChangeEvent, useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { ICreateUserRequest } from "@/models/UserModels";
import UserDataService from "@/services/UserDataService";
import _ from "lodash";
import ContainerLoader from "@/components/ContainerLoader";
import RoleDataService from "@/services/RoleDataService";
import { IRoleInfoDto } from "@/models/RoleModels";
import AvatarImageUploader from "@/components/FileUploader/AvatarImageUploader";
import { IFileDto } from "@/models/FileStorageModels";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import { alertState } from "@/common/AppAtoms";
import { useSetRecoilState } from "recoil";

interface IProps {
  onClose: () => void;
  onRefresh: () => void;
  showModal: boolean;
}

const UserCreateModal = (modalInfo: IProps) => {
  const [user, setUser] = useState<ICreateUserRequest | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [roles, setRoles] = useState<IRoleInfoDto[]>([]);
  const [filesError, setFilesError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [defaultPickedFiles, setDefaultPickedFiles] = useState<IFileDto[]>([]);
  const setAlertMessage = useSetRecoilState(alertState);


  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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

  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDateOfBirthError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, dateOfBirth: value }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswordError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, password: value }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // todo validate email
    setEmailError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, email: value }));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // todo validate phone
    setPhoneError(!value.trim());
    setUser((prevUser) => ({ ...prevUser, phoneNumber: value }));
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
    setPasswordError(false);
    setPhoneError(false);
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
        setPasswordError(false);
        setPhoneError(false);
        setDateOfBirthError(false);
        setAlertMessage(SystemAlertConstants.CreateUserSuccessConstant);
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

    UserDataService.createUser(user)
    .then(postAct)
    .catch(()=> setAlertMessage(SystemAlertConstants.CreateUserErrorConstant));
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
    setUser(undefined);
  }, [modalInfo.showModal]);

  return (
    <>
      <ContainerLoader Loading={false}>
        <MuiMaterial.Dialog
          open={modalInfo.showModal}
          fullWidth={true}
          maxWidth={'sm'}
        >
          <MuiMaterial.DialogTitle>
            Создание сотрудника
            <MuiMaterial.IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <MuiIcon.Close />
            </MuiMaterial.IconButton>
          </MuiMaterial.DialogTitle>
          <MuiMaterial.DialogContent>
            <MuiMaterial.Stack spacing={2}>

                <MuiMaterial.FormControl>
                    <MuiMaterial.FormLabel>Аватар</MuiMaterial.FormLabel>
                    <AvatarImageUploader onChange={handleFilePickChange} Files={defaultPickedFiles} filePath='avatar'/>
                    {filesError && (
                        <MuiMaterial.Typography color={'red'} variant="caption">Файл должен быть прикреплён</MuiMaterial.Typography>
                    )}
                </MuiMaterial.FormControl>

              <MuiMaterial.FormControl>
                <MuiMaterial.FormLabel>Роль</MuiMaterial.FormLabel>
                <MuiMaterial.Select
                  label="Роль"
                  variant="standard"
                  size="small"
                  value={user?.roleId}
                  onChange={handleRoleChange}
                  error={roleError}
                  displayEmpty
                >
                  {roles.map((role) => (
                    <MuiMaterial.MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MuiMaterial.MenuItem>
                  ))}
                </MuiMaterial.Select>
                {roleError && <MuiMaterial.FormHelperText error>Выберите роль</MuiMaterial.FormHelperText>}
              </MuiMaterial.FormControl>

                <MuiMaterial.TextField
                  label="Логин"
                  variant="standard"
                  size="small"
                  value={user?.login}
                  onChange={handleLoginChange}
                  error={loginError}
                  helperText={loginError && "Поле не может быть пустым"}
                />

                <MuiMaterial.TextField
                  label="Email"
                  variant="standard"
                  type="email"
                  size="small"
                  value={user?.email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError && "Некорректный email"}
                />

                <MuiMaterial.TextField
                  label="Номер телефона"
                  variant="standard"
                  size="small"
                  type="tel"
                  value={user?.phoneNumber}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  helperText={phoneError && "Некорректный номер телефона"}
                />

                <MuiMaterial.TextField
                  label="Фамилия"
                  variant="standard"
                  size="small"
                  value={user?.lastName}
                  onChange={handleLastNameChange}
                  error={lastNameError}
                  helperText={lastNameError && "Поле не может быть пустым"}
                />

                <MuiMaterial.TextField
                  label="Имя"
                  variant="standard"
                  size="small"
                  value={user?.firstName}
                  onChange={handleFirstNameChange}
                  error={firstNameError}
                  helperText={firstNameError && "Поле не может быть пустым"}
                />

                <MuiMaterial.TextField
                  label="Отчество"
                  variant="standard"
                  size="small"
                  value={user?.middleName}
                  onChange={handleMiddleNameChange}
                  error={middleNameError}
                  helperText={middleNameError && "Поле не может быть пустым"}
                />

                <MuiMaterial.TextField
                  label="Дата рождения"
                  variant="standard"
                  size="small"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={user?.dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  error={dateOfBirthError}
                  helperText={dateOfBirthError && "Поле не может быть пустым"}
                />

              <MuiMaterial.TextField
                    label="Пароль"
                    variant="standard"
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    value={user?.password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                    helperText={passwordError && "Поле не может быть пустым"}
                    InputProps={{
                      endAdornment: (
                        <MuiMaterial.InputAdornment position="end">
                          <MuiMaterial.IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <MuiIcon.VisibilityOff /> : <MuiIcon.Visibility/>}
                          </MuiMaterial.IconButton>
                        </MuiMaterial.InputAdornment>
                      ),
                    }}
              />

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

export default UserCreateModal;
