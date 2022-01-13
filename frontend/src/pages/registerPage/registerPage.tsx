import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import './registerPage.css';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import UserService from '../../services/userService/userService';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [surname, setSurname] = useState('');
  const userService = new UserService();
  const navigate = useNavigate();
  const handleChange = (setFun: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFun(event.target.value);
  };

  const registerButtonOnClick = async () => {
    const response = await userService.register({
      name, password, location, contact, surname,
    });
    if (response) {
      navigate('/login');
    }
  };

  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >

        <h3>Zarejestruj się:</h3>
        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="login">Login</InputLabel>
          <Input id="name" value={name} onChange={handleChange(setName)} />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Hasło</InputLabel>
          <Input id="password" type="password" value={password} onChange={handleChange(setPassword)} />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="login">Lokalizacja</InputLabel>
          <Input id="location" value={location} onChange={handleChange(setLocation)} />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="login">Imię i nazwisko</InputLabel>
          <Input id="surname" value={surname} onChange={handleChange(setSurname)} />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="login">Kontakt</InputLabel>
          <Input id="contact" value={contact} onChange={handleChange(setContact)} />
        </FormControl>

        <Box mt={2}>
          <Button variant="contained" onClick={registerButtonOnClick}>Zarejestruj</Button>
        </Box>

      </div>
    </div>
  );
};

export default RegisterPage;
