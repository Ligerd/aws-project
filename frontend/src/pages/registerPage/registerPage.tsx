import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import './registerPage.css';

const RegisterPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setFun: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFun(event.target.value);
  };

  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >

        <h3>Zaloguj się:</h3>
        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="login">Login</InputLabel>
          <Input id="login" value={login} onChange={handleChange(setLogin)} />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" value={password} onChange={handleChange(setPassword)} />
        </FormControl>
      </div>
    </div>
  );
};

export default RegisterPage;
