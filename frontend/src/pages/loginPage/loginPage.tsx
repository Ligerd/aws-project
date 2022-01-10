import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import jwt from 'jsonwebtoken';
import UserService from '../../services/userService/userService';
import './loginPage.css';

export interface LoginPageProps {
  setUsername: Function
}

const LoginPage = ({ setUsername }: LoginPageProps) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userService = new UserService();

  const handleChange = (setFun: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFun(event.target.value);
  };

  const loginButtonOnClick = async () => {
    const response = await userService.login({ name, password });
    if (response?.token) {
      const userInfo = await userService.getUserInfo(response.user_id);
      if (userInfo) {
        setUsername(userInfo.name);
      }

      navigate('/');
    }
  };

  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >

        <h3>Zaloguj się:</h3>
        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="login">Nazwa użytkownika</InputLabel>
          <Input id="login" value={name} onChange={handleChange(setName)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Hasło</InputLabel>
          <Input id="password" type="password" value={password} onChange={handleChange(setPassword)} className="inp" />
        </FormControl>

        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={loginButtonOnClick}>Zaloguj</Button>
            <Button variant="contained">Rejestracja</Button>
          </Stack>
        </Box>

      </div>
    </div>
  );
};

export default LoginPage;
