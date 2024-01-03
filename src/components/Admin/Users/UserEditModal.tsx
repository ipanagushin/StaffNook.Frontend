import { ChangeEvent, useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { IUserInfoDto } from "@/models/UserModels";
import UserDataService from "@/services/UserDataService";
import _ from "lodash";
import ContainerLoader from "@/components/ContainerLoader";
import RoleDataService from "@/services/RoleDataService";
import { IRoleInfoDto } from "@/models/RoleModels";

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

    //todo логика валидации для middleName, email, и roleId

    // if (user) {
    //   if (_.isUndefined(modalInfo.userId)) {
    //     UserDataService.createUser(user)
    //       .then(postAct)
    //       .catch(console.error);
    //   } else {
    //     UserDataService.updateUser(modalInfo.userId, user)
    //       .then(postAct)
    //       .catch(console.error);
    //   }
    // }
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
