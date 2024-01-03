import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import * as MuiMaterial from "@mui/material";
import { ReactComponent as AppLogo } from '@/assets/logo.svg';
import { HeaderMenuConstants } from '@/config/MenuConstants';
import ModeToggleButton from '@/components/ModeToggleButton';
import CurrentUserService from '@/services/CurrentUserService';
import { useNavigate } from 'react-router-dom';
import { ICurrentUserInfo } from '@/models/StorageModels';
// import YandexTrackerService from '../../services/YandexTrackerService';
// import YandexIdService from '../../services/YandexIdService';
// import { getUserAvatarUrl } from '../../utils/YandexLinkHelper';
// import { getInitials } from '../../utils/TextHelper';
import { useSetRecoilState } from 'recoil';
import { alertState } from '@/common/AppAtoms';
import * as SystemAlertConstants from '../../config/SystemAlertConstants';
import { getInitials } from '@/utils/TextHelper';
import * as MuiIcon from '@mui/icons-material';

function Header() {
  const [currentUser, setCurrentUser] = React.useState<ICurrentUserInfo | null>(CurrentUserService.getUserInfo());
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const setAlertMessage = useSetRecoilState(alertState);

  React.useEffect(() => {
     let userInfo = CurrentUserService.getUserInfo();
     setCurrentUser(userInfo);
   },[]);

   const handleOpenNavMenu = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }, []);
  
  const handleOpenUserMenu = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  
  const handleCloseNavMenu = React.useCallback(() => {
    setAnchorElNav(null);
  }, []);
  
    const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleLogout = React.useCallback(() => {
    handleCloseUserMenu();
    CurrentUserService.clearAllUserData();
    navigate('/login');
  }, [handleCloseUserMenu, navigate]);

  const handleAdminPanel = React.useCallback(() => {
    handleCloseUserMenu();
    navigate('/admin/users');
  }, [handleCloseUserMenu, navigate]);

  return (
    <MuiMaterial.AppBar position="static">
      <MuiMaterial.Container fixed>
        <MuiMaterial.Toolbar disableGutters>
          <MuiMaterial.Button  
            href='/'
            sx={{
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <AppLogo/>
          </MuiMaterial.Button>

          <MuiMaterial.Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MuiMaterial.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            <MenuIcon />
            </MuiMaterial.IconButton>
            <MuiMaterial.Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {HeaderMenuConstants.map((item) => (
                  <MuiMaterial.Button key={item.Name} fullWidth href={item.Href}>
                    <MuiMaterial.MenuItem>
                        <MuiMaterial.Typography textAlign="center">{item.Name}</MuiMaterial.Typography>
                    </MuiMaterial.MenuItem>
                  </MuiMaterial.Button>
              ))}
            </MuiMaterial.Menu>
            <MuiMaterial.Box 
                alignItems={'center'} 
                sx={{
                mr:1,
                display: { xs: 'flex', md: 'none' }
              }}>
                <AppLogo/>
            </MuiMaterial.Box>
          </MuiMaterial.Box>

          <MuiMaterial.Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {HeaderMenuConstants.map((item) => (
              // (item.IsEveryoneAvailable === true || currentUser?.isAdmin === true) && 
              <MuiMaterial.Button
                href={item.Href}
                key={item.Name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.Name}
              </MuiMaterial.Button>
            ))}
          </MuiMaterial.Box>

          <MuiMaterial.Box sx={{ flexGrow: 0 }}>
          <ModeToggleButton/>
              <MuiMaterial.IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml:1 }}>
                <MuiMaterial.Avatar>
                  {getInitials(currentUser?.fullName)}
                </MuiMaterial.Avatar>
              </MuiMaterial.IconButton>
              {/* <MuiMaterial.IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml:1 }}>
                <MuiMaterial.Avatar src={getUserAvatarUrl(currentUser?.avatarId)}>
                  {getInitials(currentUser?.display)}
                </MuiMaterial.Avatar>
              </MuiMaterial.IconButton> */}
            <MuiMaterial.Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MuiMaterial.Typography textAlign="center" p={1}>{currentUser?.fullName ?? ''}</MuiMaterial.Typography>
              <MuiMaterial.Divider/>
              {currentUser?.isAdmin === true && (
                <MuiMaterial.MenuItem onClick={handleAdminPanel}>
                    <MuiMaterial.ListItemIcon>
                      <MuiIcon.AdminPanelSettings fontSize="small" />
                    </MuiMaterial.ListItemIcon>
                    Админ-панель
                </MuiMaterial.MenuItem>
              )}
              <MuiMaterial.MenuItem onClick={handleLogout}>
                <MuiMaterial.ListItemIcon>
                  <MuiIcon.Logout fontSize="small" />
                </MuiMaterial.ListItemIcon>
                Выход
            </MuiMaterial.MenuItem>
            </MuiMaterial.Menu>
          </MuiMaterial.Box>
        </MuiMaterial.Toolbar>
      </MuiMaterial.Container>
    </MuiMaterial.AppBar>
  );
}

export default Header;