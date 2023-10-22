import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Snackbar, Avatar } from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FIRESTORE } from '../firebase/init';
import QrButton from '../componenets/qr-button';
import { format } from 'date-fns';
import PwaPrompt from '../componenets/pwa-prompt';

const Home: React.FC<any> = ({uid, u}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [isBlacklisted, setIsBlacklisted] = useState<any>(null);
    const [visits, setVisits] = useState<any[]>([]);
    const [money, setMoney] = useState<any>(0);
    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
    
            if (u) {
                setUser(u);
                setIsBlacklisted((u.isBlacklisted === 'true' || u.isBlacklisted === true))
                const visitsSnapshot = await getDocs(
                    collection( 
                        doc( 
                            collection(FIRESTORE, 'users'),
                        uid), 
                    'visits'));
                const sortedVisitsData = visitsSnapshot.docs.map(doc => doc.data())
                    .sort((b, a) => a.date.seconds - b.date.seconds);
                const totalDiscount = sortedVisitsData.reduce((acc, visit) => acc + (visit.discount || 0), 0);
                setVisits(sortedVisitsData);
                setMoney(totalDiscount);

            } else {
                navigate('/u/data/');
            }
        };
    
        if (uid) {
            fetchData();
        }
    }, [navigate, uid, u]);
    


    const formatDate = (timestamp) => {
        const dateObject = timestamp.toDate();
        return format(dateObject, 'dd MMM yy');
    };




    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'  }}>
            {isBlacklisted && 
                <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px' }}>
                    <Typography variant="h5" sx={{color: 'red', textAlign: 'center'}}><b>You are Blacklisted! </b></Typography>
            </Card> }

            {user && <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px' }}>
                <PwaPrompt/>
                <Grid container spacing={2}>
                    <Grid item xs={4} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        {user && user.profilePic ? 
                            <Avatar src={user.profilePic} alt="Profile" style={{ width: window.innerWidth < 300 ? 50 : 100, height: window.innerWidth < 300 ? 50 : 100 }}  />
                            : 
                            <Avatar style={{ width: 80, height: 80 }}>N/A</Avatar>
                        }
                    </Grid>
                    <Grid item xs={8} >
                        <Typography sx={window.innerWidth < 300 ? {fontSize: '16px' } :  {fontSize: '26px' }}  variant="h5"><b>{user ? user.fullName : 'Loading...'}</b></Typography>
                        <Typography sx={window.innerWidth < 300 ? {fontSize: '10px' } :  {fontSize: '20px' }}  style={{color: 'grey'}} variant="subtitle1">{user ? user.email : 'Loading...'}</Typography>
                        <Typography sx={window.innerWidth < 300 ? {fontSize: '12px' } :  {fontSize: '22px' }}  variant="subtitle1">{user ? user.location : 'Loading...'}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                      {user && !isBlacklisted &&  <QrButton name={user.fullName} pic={user.profilePic} loc={user.location} uid={uid}/> }
                    </Grid>
                    
                </Grid>
            </Card> }

            {visits && visits.length > 0 && <Card sx={{ maxWidth: 'md', padding: '16px', margin: '16px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h5"><b>STATS</b></Typography>
                    </Grid>
                    <Grid container item xs={12}  spacing={3} sm={12}>
                        <Grid container item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h4"><b>{visits.length}</b></Typography>
                            <Typography variant="body2"  sx={{color: 'grey'}}>VISITS</Typography>
                        </Grid>
                        <Grid container item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h4"><b>£{Math.round(money)}</b></Typography>
                            <Typography variant="body2"  sx={{color: 'grey'}}>SAVED</Typography>
                        </Grid>
                    </Grid>
                    
                    
                </Grid>
            </Card> }

            {visits && visits.length > 0 && 
            <Card sx={{ maxWidth: 'md', padding: '18px', margin: '16px' }}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography  variant="h5"> <b>VISITS</b></Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={1} sx={{borderBottom: 1, borderColor: '#f3f7fd'}}>
                        <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography > <b>#</b></Typography>
                        </Grid>
                        <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography > <b>DATE</b></Typography>
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Typography >  <b>BILL</b></Typography>
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Typography> <b>SAVED</b></Typography>
                        </Grid>
                        {visits.map((visit, index) => (
                            <Grid container item xs={12}  spacing={1} key={index} sx={{borderBottom: 1, borderColor: '#f3f7fd'}}>
                                <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography sx={{color: 'grey'}}>{index + 1}</Typography>
                                </Grid>
                                <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography>{formatDate(visit.date)}</Typography>
                                </Grid>
                                <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                                    <Typography>£{Math.round(visit.price)}</Typography>
                                </Grid>
                                <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                                    <Typography>£{Math.round(visit.discount)}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Card>}

            <Snackbar
                open={toastOpen}
                autoHideDuration={6000}
                onClose={() => setToastOpen(false)}
                message="Not implemented"
            />
        </div>
    );
};

export default Home;
