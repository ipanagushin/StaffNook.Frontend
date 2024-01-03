import * as MuiMaterial from '@mui/material';
import Footer from '../components/Footer/Footer';

const NotFoundPage = () => {
  return (
    <>
    <MuiMaterial.Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh' }}>
        <MuiMaterial.Typography variant="h1">404</MuiMaterial.Typography>
          <MuiMaterial.Typography 
            textAlign={'center'} 
            variant="h5">
              Ой, кажется, вы заблудились в космосе...
          </MuiMaterial.Typography>
          <MuiMaterial.Button 
            href='/' 
            size='large' 
            variant="contained" 
            color="primary" 
            sx={{
              m:2
            }}>
              Вернуться на Землю
          </MuiMaterial.Button>
    </MuiMaterial.Box>
    <Footer /></>
  );
};

export default NotFoundPage;