// import { getYandexOAuthUrl } from "../utils/YandexLinkHelper";
import * as MuiMaterial from "@mui/material";
import * as React from "react";
import IdentityService from "@/services/IdentityService.ts"
import CurrentUserService from "@/services/CurrentUserService"
import { ILoginRequest } from "@/models/IdentityModels";
import { useSetRecoilState } from 'recoil';
import { alertState } from '@/common/AppAtoms';
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
// import { AxiosError } from "axios";

// interface ErrorResponse {
//   message?: string;
//   errors?: Record<string, string[]>;
// }

// const parseError = (error: any): string => {
//   if (error.request.status === 400) {
//     const errorData: ErrorResponse = error.response.data;
    
//     if (errorData.message) {
//       // Если есть общее сообщение об ошибке, используем его
//       return errorData.message;
//     } else if (errorData) {
//       // Если есть информация о полях с ошибками, собираем сообщение
//       const errorFields = Object.keys(errorData)
//         .map((field) => `${errorData[field].join(', ')}`)
//         .join('; \n');

//       return `${errorFields}`;
//     }
//   }

//   // Если нет явных данных об ошибках, возвращаем общее сообщение об ошибке
//   return "Ашибка";
// };

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const setAlertMessage = useSetRecoilState(alertState);
  
  const handleLogin = () => {
    const login = async () => {
      try {
        let loginRequest: ILoginRequest = {
          login: username,
          password: password
        };

        let response = await IdentityService.login(loginRequest);
        CurrentUserService.setUserToken(response.data);

        window.open('/', '_self');
      } catch (error: any) {
        console.error(error);
        //todo
        setAlertMessage(SystemAlertConstants.GenericErrorConstant);
      }
    };

    login();
  };

  return (
    <MuiMaterial.Container component="main" maxWidth="lg">
      <MuiMaterial.Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <MuiMaterial.Grid container>
          <MuiMaterial.Grid
            item
            xs={false}
            sm={false}
            md={7}
            sx={{
              backgroundImage: "url(/logo-color.svg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </MuiMaterial.Grid>
          <MuiMaterial.Grid
            item
            xs={12}
            sm={12}
            md={5}
            component={MuiMaterial.Paper}
            elevation={6}
            square
          >
            <MuiMaterial.Box
              sx={{
                my: 8,
                mx: 4,
              }}
            >
              <MuiMaterial.Box>
                <MuiMaterial.TextField
                label="Логин"
                type="email"
                fullWidth
                placeholder="Логин"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                sx={{ mb: 2 }}
              />
              <MuiMaterial.TextField
                label="Пароль"
                type="password"
                fullWidth
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                sx={{ mb: 2 }}
              />
              <MuiMaterial.Button
                variant="outlined"
                onClick={handleLogin}
                fullWidth
                sx={{ mb: 2 }}
              >
                Войти
              </MuiMaterial.Button>
              </MuiMaterial.Box>
            </MuiMaterial.Box>
          </MuiMaterial.Grid>
        </MuiMaterial.Grid>
      </MuiMaterial.Box>
    </MuiMaterial.Container>
  );
}