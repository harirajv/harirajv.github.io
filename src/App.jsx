import React from 'react';
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/resume" element={<Resume/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <HashRouter>
      <AppRoutes/>
    </HashRouter>
  );
}

export default App;
