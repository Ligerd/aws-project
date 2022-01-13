import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import ProductService from '../../services/productService/productService';
import logo from '../../components/img/lada.png';
import './home.css';
import { removeValueFromLocalStorage, LocalStorageKeys } from '../../utils/localStorage/localStorage';

const pages = [
  { name: 'Strona główna', path: '' },
  { name: 'Koszyk', path: 'cart', for: ['user'] },
  { name: 'O nas', path: 'aboutus' },
  { name: 'Kontakt', path: 'contact' },
  { name: 'Zamówienia', path: 'orders', for: ['user', 'admin'] },
];

export interface HomeProps {
  username?: string;
  userRole?: string;
}

const Home = ({ username, userRole }: HomeProps) => {
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
              {pages.reduce((filtered: React.ReactElement[], page) => {
                if (page.for && (!userRole || !page.for.includes(userRole))) {
                  return filtered;
                }
                filtered.push(
                  <Button
                    key={page.path}
                    onClick={() => { switchPage(page.path); }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>,
                );
                return filtered;
              }, [])}
            </Box>
            <Box sx={{
              flexGrow: 0, display: { xs: 'flex', md: 'flex' },
            }}
            >
              {username
                ? (
                  <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    Witaj
                    {' '}
                    {username}
                    !
                    {' '}
                    <Button
                      onClick={() => {
                        removeValueFromLocalStorage(LocalStorageKeys.TOKEN);
                        window.location.reload();
                      }}
                      sx={{
                        m: 0, p: 0, color: 'white',
                      }}

                    >
                      <LogoutIcon />
                    </Button>
                  </div>
                )

                : (
                  <Button
                    onClick={() => { navigate('/login'); }}
                    sx={{
                      m: 0, p: 0, color: 'white',
                    }}
                  >
                    Zaloguj się
                  </Button>
                )}
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
