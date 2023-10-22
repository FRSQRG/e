import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // A professional blue tone
    },
    secondary: {
      main: '#FFC107', // A discount gold/yellow tone
    },
    background: {
      default: '#F4F6F8', // A light grayish background for contrast
      paper: '#FFFFFF', // White for paper components
    },
    text: {
      primary: '#212121', // Dark text for better readability
      secondary: '#757575', // Slightly lighter text for secondary content
    },
    error: {
      main: '#D32F2F', // For error messages or notifications
    },
    success: {
      main: '#43A047', // For success messages or notifications
    },
  },
  shape: {
    borderRadius: 9,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          textTransform: 'none', // Avoids uppercase transformation for a more professional look
          padding: '8px 16px', // Slightly more padding for a better visual appeal
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 9,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E88E5', // Matching the primary color
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)', // A subtle shadow for cards
        },
      },
    },
  },
});

export default theme;
