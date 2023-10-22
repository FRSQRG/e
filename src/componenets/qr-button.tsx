import React, { useRef, useState } from 'react';
import { Avatar, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import QrCode from 'qrcode.react';
import QrCodeIcon from '@mui/icons-material/QrCode';
// import html2canvas from 'html2canvas';

const QrButton = ({name, pic, loc, uid}) => {
    const [open, setOpen] = useState(false);
   
    const modalRef = useRef(null);
  

   

    const handleQRClick = () => {
        setOpen(true);
    };

    // const handleDownload = async () => {
    //     const canvas = await html2canvas(modalRef.current);
    //     const imgURL = canvas.toDataURL("image/png");
    //     const link = document.createElement('a');
    //     link.href = imgURL;
    //     link.download = 'QRCode.png';
    //     link.click();
    // };

    return (
        <>
            <Button startIcon={<QrCodeIcon />} variant="contained" color="secondary" onClick={handleQRClick}>
                Show QR Code
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent ref={modalRef} style={{ maxWidth: '100%', padding: '2rem 1rem' }}>
                    <Grid container spacing={0} style={{ maxWidth: '100%'  }}>
                        
                        {/* Row for profile picture and name */}
                        <Grid container item xs={12} sm={12} alignItems="center" >
                            <Grid item xs={1} />
                            <Grid item xs={window.innerWidth < 300 ? 2 : 3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <Avatar src={pic} alt="Profile" style={{ width: window.innerWidth < 300 ? 50 : 75, height: window.innerWidth < 300 ? 50 : 75 }} />
                            </Grid>
                        
                            {/* Name */}
                            <Grid item xs={window.innerWidth < 300 ? 9 : 8} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Typography sx={window.innerWidth < 300 ? {fontSize: '14px' } :  {fontSize: '26px' }} variant="h6" align="center">{name}</Typography>
                                <Typography sx={window.innerWidth < 300 ? {fontSize: '12px' } :  {fontSize: '20px' }} variant="body1" align="center">{loc}</Typography>
                            </Grid>
                        </Grid>

                        {/* Row for QR code */}
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                            {uid ? 
                                <QrCode value={`https://employee.squaregrillbath.co.uk/#/redeem/${uid}`} size={window.innerWidth < 600 ? window.innerWidth * 0.65 : 400 } />
                                : 
                                'Log out & Log in Again'
                            }
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <Grid container style={{ padding: '24px' }}>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </Grid>
                </Grid> */}
            </Dialog>

        </>
    );
};

export default QrButton;
