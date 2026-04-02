import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './pages/Home';
import Storyline from './pages/Storyline';
import Plans from './pages/Plans';
import Highlights from './pages/Highlights';
import Login from './pages/Login';
import Footer from './Components/Footer';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Policy from './pages/Policy';
import Credits from './pages/Credits';
import ForgotForm from './pages/ForgotForm';
import PayHistory from './pages/Payhistory.jsx';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element={<Storyline />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/Credits" element={<Credits/>} />
        <Route path="/forgot-password" element={<ForgotForm/>} />
        <Route path="/payhistory" element={<PayHistory/>} />
        
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
