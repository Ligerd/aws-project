import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { LocalStorageKeys, getValueFromLocalStorage } from './utils/localStorage/localStorage';
import Home from './pages/home/home';
import ItemDetails from './pages/aboutUs/aboutUs';
import Contact from './pages/contact/contact';
import './App.css';
import PrivateRoute from './utils/privateRoute/privateRoute';
import LoginPage from './pages/loginPage/loginPage';
import ProductList from './pages/productList/productList';
import UserService from './services/userService/userService';

function App() {
  const [username, setUsername] = useState('');
  const userService = new UserService();
  useEffect(() => {
    const getUsernameFromToken = async () => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);
      if (token) {
        const tokenInfo = jwt.decode(token);
        const userInfo = await userService.getUserInfo((tokenInfo as any)?.sub.user_id);
        if (userInfo) {
          setUsername(userInfo.name);
        }
      }
    };
    getUsernameFromToken();
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home username={username} />}>
            <Route path="" element={<ProductList />} />
            <Route path="aboutus" element={<ItemDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginPage setUsername={setUsername} />} />
            <Route path="cart" element={<PrivateRoute><Contact /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
