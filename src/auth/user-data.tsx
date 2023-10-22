import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, Grid, Snackbar, Typography } from '@mui/material';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import CaptureFace from './capture-face';
import { FIRESTORE, STORAGE } from '../firebase/init';
import Swal from 'sweetalert2';

const UserData: React.FC<any> = ({uid})=> {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pic, setPic] = useState('');
  const [dob, setDob] = useState('2000');
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('Name');
  const [errorMessage, setErrorMessage] = useState('');

  // Error states
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [restaurantError, setRestaurantError] = useState(false);
  const [picError, setPicError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const locationCollection = collection(FIRESTORE, 'location');
      const snapshot = await getDocs(locationCollection);
      const restaurantNames = snapshot.docs.map(doc => doc.data().name);
      setRestaurants(restaurantNames);
    };

    fetchData();
  }, []);

  const validateFields = () => {
    let isValid = true;

    if (!fullName) {
      setFullNameError(true);
      isValid = false;
    } else {
      setFullNameError(false);
    }

    if (!email.includes('@')) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!phone) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (!dob || dob === '2000') {
      setDobError(true);
      isValid = false;
    } else {
      setDobError(false);
    }

    if (selectedRestaurant === 'Name') {
      setRestaurantError(true);
      isValid = false;
    } else {
      setRestaurantError(false);
    }

    if (!pic) {
      setPicError(true);
      isValid = false;
    } else {
      setPicError(false);
    }

    return isValid;
  };

  const handleContinue = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(STORAGE, `profile-pics/${email}`);
      await uploadString(storageRef, pic, 'data_url');
      const picURL = await getDownloadURL(storageRef);
  
      const userRef = collection(FIRESTORE, 'users');
      const userDocRef = doc(userRef, uid); // Reference to the user's document using the UID
  
      // Set the data directly on the user's document
      setDoc(userDocRef, {
          fullName,
          email,
          uid,
          phone,
          dob,
          location: selectedRestaurant,
          profilePic: picURL
      }).then(() =>  window.location.href = '/').catch((e: any) => {
        Swal.fire({
          title: 'Oops...', 
          text: 'Something went wrong, please try again.', 
          icon: 'error',
          timer: 1000
        })
      })
  
  } catch (error) {
      setErrorMessage('Error saving data. Please try again.');
  }
}
  
  return (
    <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Typography color='primary' variant='h4' style={{fontWeight: '800'}} > NEARLY THERE </Typography> 
        </Grid><Grid item xs={12} sm={4} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          {pic ?
            <div style={{ width: '80%', paddingBottom: '80%', position: 'relative', borderRadius: '50%', overflow: 'hidden', }}>
              <img src={pic} alt="Captured" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
            :
            <CaptureFace setPic={setPic} />
          }
          {picError ? <Typography variant='body2' style={{color: 'red'}}> A Profile Picture Is Required </Typography> : null}
        </Grid>

        <Grid item xs={12} sm={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={fullNameError}
                helperText={fullNameError ? "Full Name is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type='email'
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Valid email is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type='tel'
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
                helperText={phoneError ? "Phone number is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Date of Birth"
                variant="outlined"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                error={dobError}
                helperText={dobError ? "Date of Birth is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                required
                label="Restaurant"
                variant="outlined"
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                SelectProps={{ native: true }}
                error={restaurantError}
                helperText={restaurantError ? "Restaurant selection is required" : ""}
              >
                <option key={0} value={'name'}>
                  Chose a Location
                </option>
                {restaurants.map((restaurant, index) => (
                  <option key={index+1} value={restaurant}>
                    {restaurant}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" onClick={handleContinue}>
            CONTINUE
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </Card>
  );
};

export default UserData;
