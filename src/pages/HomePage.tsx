import * as MuiMaterial from "@mui/material";
import PrivateLayout from "../components/Layouts/PrivateLayout";
import NewsList from "@/components/News/NewsList";
import Calendar from "@/components/Calendar/Calendar";


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
            <Calendar/>
            <NewsList/>
          </MuiMaterial.Box>
        </PrivateLayout>
    </>);
    }
export default HomePage;