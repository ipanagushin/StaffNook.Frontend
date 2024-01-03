import { PropsWithChildren } from "react";
import * as MuiMaterial from '@mui/material';

interface ILoaderData {
    Loading: boolean
}
  
    const ContainerLoader = (loadData: PropsWithChildren<ILoaderData>) : JSX.Element => {

    if(loadData.Loading){
        return(
            <>
            <MuiMaterial.Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}>
            <MuiMaterial.CircularProgress color="inherit" />
            </MuiMaterial.Backdrop>
        </>)
    }

    return loadData.children as JSX.Element || <></>;
    } 

export default ContainerLoader;