import AdminHeader from "@/components/Admin/Header/Header";
import { PropsWithChildren } from "react";
import * as MuiMaterial from '@mui/material';


interface AdminLayoutProps{
    PageId: string
}

const AdminLayout = ((props: PropsWithChildren<AdminLayoutProps>) => {
    return (
        <MuiMaterial.Box sx={{ display: 'flex' }}>
        <AdminHeader PageId={props.PageId} />
        <MuiMaterial.Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}>
            <MuiMaterial.Toolbar />
            <MuiMaterial.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {props.children}
            </MuiMaterial.Container>
        </MuiMaterial.Box>
    </MuiMaterial.Box>
    )
})

export default AdminLayout;