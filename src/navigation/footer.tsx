import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';

function Footer() {
  const isMobile = useMediaQuery('(max-width:600px)');

  if (isMobile) {
    return (
      <AppBar position="fixed">
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
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

        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Box 
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'primary.main',
        color: 'white',
        padding: 2,
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">© Employee Management {new Date().getFullYear()}</Typography>
    </Box>
  );
}

export default Footer;
