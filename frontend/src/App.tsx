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
import ProductPage from './pages/productPage/productPage';

function App() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const userService = new UserService();
  useEffect(() => {
    const getUsernameFromToken = async () => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);
      if (token) {
        const tokenInfo = jwt.decode(token);
        const userInfo = await userService.getUserInfo((tokenInfo as any)?.sub.user_id);
        if (userInfo) {
          setUsername(userInfo.name);
          setUserRole(userInfo.role);
        }
      }
    };
    getUsernameFromToken();
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home username={username} userRole={userRole} />}>
            <Route path="" element={<ProductList username={username} userRole={userRole} />} />
            <Route path="aboutus" element={<ItemDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginPage setUsername={setUsername} setUserRole={setUserRole} />} />
            <Route path="cart" element={<PrivateRoute><Contact /></PrivateRoute>} />
            <Route path="product" element={<PrivateRoute userRole={userRole} adminRoute><ProductPage /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
