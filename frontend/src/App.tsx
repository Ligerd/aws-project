import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/home/home';
import ItemDetails from './pages/item-details/item-details';
import Contact from './pages/contact/contact';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="aboutus" element={<ItemDetails />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
