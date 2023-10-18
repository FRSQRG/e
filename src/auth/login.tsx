import { Typography } from '@mui/material';
import React, { useState } from 'react';

const Button = ({ handleClick }) => (
  <div onClick={handleClick} className="btn">
    <p>Log In</p>
  </div>
);

const ErrorMessage = ({ msg, show }) => (
  <div className={show ? "errorMsg" : "hideErrorMsg"}>
    <h3>{msg}</h3>
  </div>
);

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <h3>{label}</h3>
    <input
      type={type}
      name={name}
      onChange={e => onChange(name, e.target.value)}
      value={value}
      className="input"
    />
  </div>
);

const Box = ({ children }) => <div className="box">{children}</div>;

const LoginView = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [error, setError] = useState({
    email: false,
    emailField: false,
    pass: false,
    message: ""
  });

  const handleInput = (field, value) => {
    if (field === "email") {
      setEmailValue(value);
      isEmailValid(value);
    } else if (field === "password") {
      setPassValue(value);
      isFieldsEmpty();
    }
  };

  const isEmailValid = (email: string) => {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (
      lastAtPos < lastDotPos &&
      lastAtPos > 0 &&
      email.indexOf("@@") === -1 &&
      lastDotPos > 2 &&
      email.length - lastDotPos > 2
    ) {
      setError(prev => ({ ...prev, email: false }));
    } else {
      setError(prev => ({
        ...prev,
        email: true,
        message: "Invalid Email Format"
      }));
    }
  };

  const isFieldsEmpty = () => {
    if (!emailValue || !passValue) {
      setError(prev => ({
        ...prev,
        pass: passValue === "",
        email: emailValue === "",
        message: "Please fill all details"
      }));
      return true;
    } else {
      setError(prev => ({ ...prev, pass: false }));
      return false;
    }
  };

  const handleClick = () => {
    if (!isFieldsEmpty() && !error.email && !error.pass) alert("adsasg");
  };

  return (
    <div className="loginContainer">
      <Box>
        <Typography variant="h4" color="textPrimary" sx={{color: '#fff', textAlign: 'center'}}>
            Employee Login
        </Typography>
        <InputField
          onChange={handleInput}
          label="email"
          name="email"
          value={emailValue}
        />
        <InputField
          onChange={handleInput}
          label="password"
          name="password"
          value={passValue}
          type="password"
        />
        <ErrorMessage msg={error.message} show={error.email || error.pass} />
        <Button handleClick={handleClick} />
      </Box>
    </div>
  );
};

export default LoginView;
