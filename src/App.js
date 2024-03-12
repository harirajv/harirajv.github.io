import React from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/resume" component={Resume} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/contact" component={Contact} />
      </Layout>
    </HashRouter>
  );
}

export default App;
