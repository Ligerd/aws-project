import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import UserService from '../../services/userService/userService';

import logo from '../../components/img/lada.png';
import './home.css';

const pages = [
  { name: 'Strona główna', path: '' },
  { name: 'O nas', path: 'aboutus' },
  { name: 'Kontakt', path: 'contact' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const userService = new UserService();

const Home = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const switchPage = (path: string) => {
    navigate(path);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const login = async () => {
      const response = await userService.login({ name: 'admin', password: 'admin' });
      console.log(response);
    };

    login();
  }, []);
  return (
    <div style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>

            <Link style={{ alignSelf: 'center' }} to="/">
              <img className="logo" src={logo} alt="Logo" />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  onClick={() => { switchPage(page.path); }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth="xl"
        style={{
          padding: '10px 80px 0 80px', textAlign: 'center', wordWrap: 'break-word',
        }}
      >
        <Outlet />
      </Container>

    </div>
  );
};

export default Home;