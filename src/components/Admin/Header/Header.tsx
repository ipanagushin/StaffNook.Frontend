import { ReactComponent as AppLogo } from '@/assets/colored-logo.svg';
import { useState } from "react";
import SideBarDropdown from "@/components/Admin/Header/SideBar/SideBarDropdown";
import * as MuiMaterial from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as MuiIcon from '@mui/icons-material';
import { Link } from "react-router-dom";
import { GroupedMenuItems, IGroupAdminMenu } from "./MenuItems";

interface IAdminHeaderProps{
    PageId: string
}

const AdminHeader = (props: IAdminHeaderProps) => {

    const [currentPage, setCurrentPage] = useState<string>(props.PageId);
    const [openToggle, setopenToggle] = useState<boolean>(true); 

    const toggleDrawer = () =>{
        setopenToggle(!openToggle);
    }

    const clickMenu = (currentPage: string) =>{
        setCurrentPage(currentPage);
    }

    const activeFunc = (pageId: string) : boolean | undefined => {
        return currentPage === pageId;
    }

    const drawerWidth: number = 240;
    
    interface AppBarProps extends MuiMaterial.AppBarProps {
        open?: boolean;
    }

    const renderGroupAdminMenuItem = (groupAdminMenu: IGroupAdminMenu) =>{
        return(
            <SideBarDropdown key={groupAdminMenu.Name} GroupName={groupAdminMenu.Name}>
                {
                    groupAdminMenu.MenuItems.map(menuItem => {
                        return(
                            <Link key={menuItem.PageId} to={menuItem.Path} 
                                style={{
                                textDecorationLine:'none',
                                color:'#58454B'
                            }}
                                onClick={_ => clickMenu(menuItem.PageId)}>
                                <MuiMaterial.ListItemButton sx={{
                                    ...(activeFunc(menuItem.PageId) && {
                                        backgroundColor: '#8B7685',
                                        color: 'white'
                                    }), "&:hover":{
                                        color: '#58454B',
                                        backgroundColor: '#8b768572'
                                    }
                                }}>
                                    {menuItem.Name}
                                </MuiMaterial.ListItemButton>
                            </Link>
                        )
                    })
                }
            </SideBarDropdown>
        )
    }

    const AppBar = MuiMaterial.styled(MuiMaterial.AppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));

    const Drawer = MuiMaterial.styled(MuiMaterial.Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
              overflowX: 'hidden',
              width: theme.spacing(0)
            }),
          },
        }),
      );

    return (
        <>
            <MuiMaterial.CssBaseline />
            <AppBar position="absolute" open={openToggle}>
            <MuiMaterial.Toolbar>
                <MuiMaterial.IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    ...(openToggle && { display: 'none' }),
                }}
                >
                <MenuIcon />
                </MuiMaterial.IconButton>
                <MuiMaterial.Typography
                component="h1"
                variant="h3"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                
                </MuiMaterial.Typography>
                <MuiMaterial.Button  
                  href='/'
                  color='inherit'
                >
                <MuiIcon.ExitToApp/>
              </MuiMaterial.Button>
                
            </MuiMaterial.Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openToggle}>
                <MuiMaterial.Toolbar
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                    }}
                >
                <MuiMaterial.Button  
                  href='/'
                  sx={{
                    display: { xs: 'none', md: 'flex' }
                  }}
                >
                <AppLogo/>
                </MuiMaterial.Button>
                    <MuiMaterial.IconButton onClick={toggleDrawer}>
                    <MuiIcon.ChevronLeft />
                    </MuiMaterial.IconButton>
                </MuiMaterial.Toolbar>
                <MuiMaterial.Divider />
                
                <MuiMaterial.List component="nav">
                    {
                        GroupedMenuItems.map(groupAdminMenuItem => renderGroupAdminMenuItem(groupAdminMenuItem))
                    }
                </MuiMaterial.List>
            </Drawer>
        </>
    )
} 

export default AdminHeader;