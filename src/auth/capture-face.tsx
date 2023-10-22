import React, { useRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const CaptureFace: React.FC<any> = ({ setPic }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [open, setOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          width: { ideal: 480 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  const captureImage = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 480, 480);
      const dataUrl = canvasRef.current.toDataURL("image/png");
      stopCamera()
      setCapturedImage(dataUrl);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    stopCamera();
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Profile Picture
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent style={{ textAlign: 'center', position: 'relative' }}>
          {!capturedImage ? (
            <>
              <div style={{ position: 'relative', display:'flex', justifyContent: 'center', margin: 'auto', width: '100%', maxWidth: '480px' }}>
                <video 
                    ref={videoRef} 
                    width="100%" 
                    height="auto" 
                    playsInline 
                    autoPlay 
                    style={{ display: 'block', width: '100%', borderRadius: '16px' }}
                ></video>
                <canvas 
                    ref={canvasRef} 
                    width="480" 
                    height="480" 
                    style={{ display: 'none' }}
                ></canvas>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, transparent 5%, rgba(255,255,255,0.95) 100%)',
                    borderRadius: '16px'
                }}>
                    <p style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(8px)',  color: 'black', padding: '12px', borderRadius: '16px' }}>
                        <b>Make Sure Your Face is Visible</b>
                    </p>
                </div>
            </div>
            </>
          ) : (
            <img src={capturedImage} alt="Captured" width="100%" style={{ maxWidth: '480px', borderRadius: '16px' }} />
          )}
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          {!capturedImage ? (
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse', width: '80%'}}>
              <Button onClick={captureImage} variant="contained" color="secondary">
                Capture Image
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Close
              </Button>
            </div>
          ) : (
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse', width: '80%'}}>
              <Button onClick={() => { setPic(capturedImage); handleClose() }} variant="contained" color="secondary">
                Save Image
              </Button>
              <Button onClick={() => {
                setCapturedImage(null);
                handleClose()
              }} variant="outlined">
                Retry
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CaptureFace;
