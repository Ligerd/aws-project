import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/home/home';
import ItemDetails from './pages/aboutUs/aboutUs';
import Contact from './pages/contact/contact';
import './App.css';
import PrivateRoute from './utils/privateRoute/privateRoute';
import LoginPage from './pages/loginPage/loginPage';
import ProductList from './pages/productList/productList';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<ProductList />} />
            <Route path="aboutus" element={<ItemDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="cart" element={<PrivateRoute><Contact /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
