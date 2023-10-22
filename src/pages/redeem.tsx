import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography, Avatar, Card } from '@mui/material';
import { AUTH, FIRESTORE, } from '../firebase/init';
import { collection, doc, getDoc, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RedeemOutlined } from '@mui/icons-material';

function Redeem() {

  const { uid } = useParams();
  const [profile, setProfile] = useState(null);
  const [isBlacklisted, setIsBlacklisted] = useState(null);
  const [visits, setVisits] = useState(0);
  const [isManager, setIsManager] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [bill, setBill] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AUTH.currentUser
    const checkManagerRole = async () => {
      const userRef = collection(FIRESTORE, 'users');
      const userDocRef = doc(userRef, user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists() && userSnapshot.data().role === 'manager') {
        setIsManager(true);
        
        const profileDocRef = doc(userRef, uid);
        const profileSnapshot = await getDoc(profileDocRef);
        if (profileSnapshot.exists()) {
          setIsBlacklisted((profileSnapshot.data().isBlacklisted === 'true' || profileSnapshot.data().isBlacklisted === true))
          setProfile(profileSnapshot.data());
          const visitsRef = collection(profileDocRef, 'visits');
          const visitsSnapshot = await getDocs(visitsRef);
          if (visitsSnapshot.docs.length) {
            setVisits(visitsSnapshot.docs.length);
          }
        } else {
            setProfile(0)
        }
       
      }
    };
    console.log(uid)
    console.log(user)
    if (uid && user) {
      checkManagerRole();
    }
  }, [uid]);

  const handleClaimDiscount = async () => {
    const discount = bill * 0.3;
    const visitData = {
        fullname: profile?.fullname || "Unknown",
        date: new Date(),
        price: bill,
        discount: discount
    };

    const visitsRef = collection(FIRESTORE, 'users', uid, 'visits');
    await addDoc(visitsRef, visitData);

    setShowPopup(false);
    Swal.fire({
        title: 'Success',
        text: 'Discount applied!',
        icon: 'success',
    }).then((result) => {
            navigate('/');  
    });
    
};

  if (isManager) {
    if (profile && profile.profilePic && profile.fullName && profile.location) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignContent: 'center', alignItems: 'center', marginTop: '100px'  }}>
                <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px', width: '80vw', }} style={{padding: '24px'}}>
                    <Grid container spacing={2} direction="row" alignItems="center">
                        <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            {profile && profile.profilePic ? 
                                <Avatar src={profile.profilePic} alt="Profile" style={{ width: window.innerWidth < 300 ? 50 : 100, height: window.innerWidth < 300 ? 50 : 100 }}  />
                                : 
                                <Avatar style={{ width: 80, height: 80 }}>N/A</Avatar>
                            }
                        </Grid>
                        <Grid item xs={8} >
                            <Typography sx={window.innerWidth < 300 ? {fontSize: '16px' } :  {fontSize: '26px' }}  variant="h5"><b>{profile ? profile.fullName : 'Loading...'}</b></Typography>
                            <Typography sx={window.innerWidth < 300 ? {fontSize: '12px' } :  {fontSize: '22px' }} style={{color: 'grey'}}  variant="subtitle1">{profile ? profile.location : 'Loading...'}</Typography>
                            <Typography sx={window.innerWidth < 300 ? {fontSize: '12px' } :  {fontSize: '22px' }}  variant="subtitle1">Visits: {visits ? visits : 'Loading...'}</Typography>
                        </Grid>
                        {isBlacklisted && <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <Typography sx={window.innerWidth < 300 ? {fontSize: '16px' } :  {fontSize: '26px' }}  style={{color: 'red'}} variant="h5">
                              <b>This user is Blacklisted</b>
                            </Typography>
                        </Grid> }
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button disabled={isBlacklisted} fullWidth variant="contained" startIcon={<RedeemOutlined/>} color="secondary" onClick={() => setShowPopup(true)}>Record Visit</Button>
                        </Grid>
                    </Grid>
    
                    <Dialog open={showPopup} onClose={() => setShowPopup(false)} fullWidth>
                    <DialogTitle style={{textAlign: 'center'}}>Claim Discount</DialogTitle>
                    <DialogContent style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <TextField
                                fullWidth
                                label="Full Bill Price"
                                type="number"
                                style={{marginTop: 16}}
                                value={bill}
                                onChange={e => setBill(parseFloat(e.target.value))}
                            />
                        <Button variant="contained" color="secondary" onClick={handleClaimDiscount} style={{ marginTop: '16px' }}>Claim Discount</Button>
                    </DialogContent>
                    </Dialog>
                </Card>
            </div>
        );
    } else {
                return  (
            <div style={{ display: 'flex', justifyContent: 'center',  }}>
                <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px' }}>
                    <Typography align="center" variant="h6" color="error">That Didn't Work. Scan the Qr Code Again!</Typography>
                </Card>
            </div>)

    }
  } else {
    return  (
    <div style={{ display: 'flex', justifyContent: 'center',  }}>
        <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px' }}>
            <Typography align="center" variant="h6" color="error">You do not have permission to record and apply a discount.</Typography>
        </Card>
    </div>)
  }
}

export default Redeem;


