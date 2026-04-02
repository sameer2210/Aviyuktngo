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
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import { servicesData } from './data/servicesData';


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
        <Route path="/credits" element={<Credits/>} />
        <Route path="/forgot-password" element={<ForgotForm/>} />
        <Route path="/payhistory" element={<PayHistory/>} />
        <Route path="/services" element={<Services />} />
        {servicesData.map((service) => (
          <Route
            key={service.slug}
            path={`/services/${service.slug}`}
            element={<ServiceDetail serviceSlug={service.slug} />}
          />
        ))}
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
