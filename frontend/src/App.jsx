import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Components/Header';
import Home from './pages/Home';
import Storyline from './pages/Storyline';
import Plans from './pages/Plans';
import Highlights from './pages/Highlights';
import Footer from './Components/Footer';
import Profile from './pages/Profile';
import Policy from './pages/Policy';
import Credits from './pages/Credits';
import PayHistory from './pages/Payhistory.jsx';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import { servicesData } from './data/servicesData';
import Auth from './pages/Auth';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Aviyukt NGO | Top NGO in Bhopal, MP, India</title>
        <meta name="description" content="Aviyukt NGO is a leading non-profit organization in Bhopal, Madhya Pradesh, dedicated to empowering communities and creating a positive impact." />
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element={<Storyline />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/policy" element={<Policy/>} />
        <Route path="/credits" element={<Credits/>} />
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
