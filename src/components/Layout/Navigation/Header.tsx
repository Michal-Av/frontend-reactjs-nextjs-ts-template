'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/images/logo/3.png';
import { logout } from '@/services/api-auth';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User has logged out');
      sessionStorage.setItem('isLoggedIn', 'false');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right,rgb(27, 80, 126),rgb(0, 10, 65))' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Image src={Logo} alt="Logo" width={50} height={50} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Welcome, {username || 'Guest'}
          </Typography>
        </Box>

        <Button color="inherit" startIcon={<HomeIcon />} href="/home">
          Home
        </Button>
        <Button color="inherit" startIcon={<AccountCircle />} href="/profile">
          Profile
        </Button>
        <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
