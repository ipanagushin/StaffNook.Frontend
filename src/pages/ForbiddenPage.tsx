import React from 'react';
import * as MuiMaterial from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const ForbiddenPage: React.FC = () => {
  return (
    <MuiMaterial.Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' }}>
            <MuiMaterial.Typography textAlign={'center'} variant="h4" p={3}>Опаньки! Доступ запрещен</MuiMaterial.Typography>
            <MuiMaterial.Typography variant="subtitle1" textAlign={'center'}>
                Страница доступа закрыта супер-секретным щитом!
            </MuiMaterial.Typography>
            <MuiMaterial.Typography variant="subtitle1" textAlign={'center'}>
                Видимо, ваш космический ключ не подходит к нашей организации. Но не волнуйтесь!
            </MuiMaterial.Typography>
            <MuiMaterial.Typography variant="subtitle1" textAlign={'center'}>
                Вам всегда можно присоединиться к нам, став частью нашей команды.
            </MuiMaterial.Typography>
            <MuiMaterial.Typography variant="subtitle1" textAlign={'center'}>
                Для этого пройдите авторизацию и проверьте свой космический билет снова!
            </MuiMaterial.Typography>

            <MuiMaterial.Button endIcon={<RocketLaunchIcon/>} variant="contained" color="primary" href='/' sx={{
                mt:2
            }}>
                Попробовать снова
            </MuiMaterial.Button>
      </MuiMaterial.Box>
  );
};

export default ForbiddenPage;
