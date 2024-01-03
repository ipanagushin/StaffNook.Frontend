import * as MuiMaterial from "@mui/material";
import PrivateLayout from "../components/Layouts/PrivateLayout";
const HomePage = () => {

    return (
    <>
        <PrivateLayout>
          <MuiMaterial.Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '100vh'
          }}>
            <MuiMaterial.Typography variant="h1">
              WIP
            </MuiMaterial.Typography>
            <MuiMaterial.Button href="/my-reports" size="large" variant="outlined">
                Мои отчеты
            </MuiMaterial.Button>
          </MuiMaterial.Box>
        </PrivateLayout>
    </>);
    }
export default HomePage;