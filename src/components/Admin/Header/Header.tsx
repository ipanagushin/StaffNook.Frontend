import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppLogo from '@/assets/colored-logo.svg';
import ModeToggleButton from '@/components/ModeToggleButton';
import SideBarDropdown from '@/components/Admin/Header/SideBar/SideBarDropdown';
import { GroupedMenuItems, IGroupAdminMenu } from "./MenuItems";

interface IAdminHeaderProps {
    PageId: string;
}

const drawerWidth: number = 250;

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: { theme: any, open?: boolean }) => ({
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

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }: { theme: any, open?: boolean }) => ({
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

const AdminHeader: React.FC<IAdminHeaderProps> = (props) => {
    const [currentPage, setCurrentPage] = useState<string>(props.PageId);
    const [openToggle, setOpenToggle] = useState<boolean>(true);

    const toggleDrawer = () => {
        setOpenToggle(!openToggle);
    };

    const clickMenu = (currentPage: string) => {
        setCurrentPage(currentPage);
    };

    const activeFunc = (pageId: string): boolean | undefined => {
        return currentPage === pageId;
    };

    const renderGroupAdminMenuItem = (groupAdminMenu: IGroupAdminMenu) => {
        return (
            <SideBarDropdown key={groupAdminMenu.Name} GroupName={groupAdminMenu.Name}>
                {groupAdminMenu.MenuItems.map(menuItem => (
                    <Link key={menuItem.PageId} to={menuItem.Path}
                        style={{
                            textDecorationLine: 'none',
                            color: '#8B7685'
                        }}
                        onClick={_ => clickMenu(menuItem.PageId)}>
                        <ListItemButton
                            sx={{
                                ...(activeFunc(menuItem.PageId) && {
                                    backgroundColor: '#8B7685',
                                    color: 'white'
                                }), "&:hover": {
                                    color: 'white',
                                    backgroundColor: '#8b768572'
                                }
                            }}>
                            {menuItem.Name}
                        </ListItemButton>
                    </Link>
                ))}
            </SideBarDropdown>
        );
    };

    return (
        <>
            {/* @ts-ignore */}
            <StyledAppBar position="absolute" open={openToggle}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            ...(openToggle && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h3"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <ModeToggleButton />
                    <Button
                        href='/'
                        color='inherit'
                    >
                        <ExitToAppIcon />
                    </Button>
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" open={openToggle}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        href='/'
                        sx={{
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        <img src={AppLogo} alt="logo" />
                    </Button>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {GroupedMenuItems.map(groupAdminMenuItem => renderGroupAdminMenuItem(groupAdminMenuItem))}
                </List>
            </StyledDrawer>
        </>
    );
};

export default AdminHeader;