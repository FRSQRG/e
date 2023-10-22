import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { LogoutOutlined, LoyaltyOutlined, ManageAccountsOutlined } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { AUTH } from '../firebase/init';

function Navigation({isManager}) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const logout = async () => {
    try {
      await signOut(AUTH);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  if (isMobile) {
    return (
      <Box sx={{ width: '100%', position: 'fixed', zIndex: 99, bottom: 0 }}>
        <BottomNavigation showLabels sx={{ boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)' }}>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
            {isManager ? <BottomNavigationAction label="Admin" icon={<ManageAccountsOutlined />} component={Link} to="/admin" /> : <></>}
            <BottomNavigationAction label="Rewards" icon={<LoyaltyOutlined />} component={Link} to="/rewards" />
            <BottomNavigationAction  label="Log Out" icon={<LogoutOutlined />} onClick={logout}/>
        </BottomNavigation>
      </Box>

    );
  }

  return (
  <AppBar position="sticky">
    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton edge="start" 
          sx={{ 
              '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'transparent'  // To ensure no color change on hover
              }
          }}  color="inherit" aria-label="logo"><img 
          src="https://squaregrillbath.co.uk/wp-content/uploads/2022/01/Square-logo-1.png" 
          alt="logo" 
          style={{ height: 40, filter: 'brightness(5.5)' }} 
      />
        </IconButton>

        <div>
        <Button color="inherit" component={Link} to="/">HOME</Button>
        <Button color="inherit" component={Link} to="/rewards">REWARDS</Button>
        {isManager ? <Button color="inherit" component={Link} to="/admin">ADMIN</Button> :<></>}
        <Button color="inherit" onClick={logout}>LOG OUT</Button>
        </div>
    </Toolbar>
    </AppBar>
  );
}

export default Navigation;
