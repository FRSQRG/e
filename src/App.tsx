import React, { useEffect, useState } from 'react';
import './App.css';

// Import HashRouter
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './auth/login';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import { AUTH, FIRESTORE } from './firebase/init';
import { onAuthStateChanged } from '@firebase/auth';
import Navigation from './navigation/navigation';
import Footer from './navigation/footer';
import UserData from './auth/user-data';
import Home from './pages/home';
import Redeem from './pages/redeem';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Box, CircularProgress } from '@mui/material';
import AdminView from './pages/admin-view';
import RewardsTerms from './pages/rewards';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUID] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoadin, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, async (userAuth) => {
      if (userAuth) {
        setUID(userAuth.uid)
        setIsAuthenticated(true);
        
        const userRef = collection(FIRESTORE, 'users');
        const profileDocRef = doc(userRef, userAuth.uid);
        const profileSnapshot = await getDoc(profileDocRef);
  
        if (profileSnapshot.exists()) {
            setUser(profileSnapshot.data());
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
      } else {
        // No user is signed in
        setIsAuthenticated(false);
        setIsLoading(false)
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (

    <ThemeProvider theme={theme}>
      <Router>

        { 
          isLoadin ? 
            <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
            :
            isAuthenticated ?  
              <>
                <Navigation isManager={user?.role} />
                
                  <div style={{  width: '100%',  paddingTop: '56px', paddingBottom: '100px', display: 'flex', justifyContent: 'center',}}>
                    <Routes>
                      <Route path="/u/data" element={<UserData  uid={uid} />} />
                      <Route path="/redeem/:uid" element={<Redeem/>} />
                      <Route path="/" element={<Home uid={uid} u={user}/>} />
                      <Route path="/admin" element={<AdminView/>} />
                      <Route path="/rewards" element={<RewardsTerms/>} />
                    </Routes>
                  </div>
                <Footer /> 
              </>
              : 
              <LoginView />
        }

      </Router>
    
    </ThemeProvider>
  );
}

export default App;