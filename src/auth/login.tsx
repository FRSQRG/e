import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import {  Box, Button } from '../componenets/init';
import {  handleLogin } from './login-logic';
import { useNavigate } from 'react-router-dom';
const LoginView = () => {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
 
  const handleInput = (e,) => {
    setInputValue(e.target.value);
  };


  return (
    <div className='loginbody'>
      <div className="loginContainer">
        <Box>
          <Typography variant="h4" color="textPrimary" sx={{color: '#fff', textAlign: 'center'}}>
              LOGIN / REGISTER
          </Typography><TextField
    onChange={handleInput}
    sx={{
        marginLeft: '10%',
        marginRight: '10%',
        color: '#fff',
        marginTop: '26px',
        '& .MuiOutlinedInput-root': {
          color: '#fff',
            '& fieldset': {
                borderColor: '#e0e0e0', // Light gray border
            },
            '&:hover fieldset': {
                borderColor: '#fff', // Slightly darker gray on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: '#eee', // Even darker gray when the input is focused
            },
        },
        '& .MuiInputLabel-root': {
            color: '#e0e0e0', // Light gray label
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#fff', // Darker gray label when the input is focused
        },
    }}
    label="Phone Nr"
    name="input"
    value={inputValue ? inputValue : '+44' }
/>
          <div style={{margin: '12px', display: 'flex', justifyContent: 'center'}} id='re-captcha'/>

          <Button handleClick={(_) => handleLogin(inputValue, navigate)} label="Log In" />
          {/* <button onClick={(_) => handleGoogleLogin()} label="Login with Google" /> */}
        </Box>
      </div>
    </div>
  );
};

export default LoginView;
