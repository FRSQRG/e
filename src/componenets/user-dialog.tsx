import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Swal from 'sweetalert2';
import Home from '../pages/home';

interface UserDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  user: any;
  onAction: (b) => Promise<void>;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ open, onClose, user, onAction }) => {
    const isBlacklisted = user.isBlacklisted
    console.log(user)
    console.log(isBlacklisted)
    
    const handleDelete = async () => {
    onClose()
    const t = isBlacklisted ? `Are you sure you want to remove ${user?.fullName} from the BlackList? ` : `Are you sure you want to BlackList ${user?.fullName}? `
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: t,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await onAction(isBlacklisted);
      Swal.fire('Success!', `${user?.fullName} has been ${isBlacklisted ? 'removed from the BlackList':'BlackListed'}.`, 'success');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle sx={{textAlign: 'center'}}><b>{user.fullName}</b></DialogTitle>
      <DialogContent sx={{backgroundColor: '#E6F7FF'}} >
        {/* Render user details here */}
        <Home uid={user.uid} u={user}/>
        {/* Add more user details as needed */}
      </DialogContent>
      <DialogActions sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
        <Button onClick={onClose}>Close</Button>
        <Button color="error" onClick={handleDelete}>{isBlacklisted ? 'WhiteList' : 'BlackList'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
