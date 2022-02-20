import { useContext } from 'react';
import { ThemeContext } from './context';
import './App.css';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Intro from './components/intro/Intro';
import Toggle from './components/toggle/Toggle';

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div 
      className="App"
      style={{
        backgroundColor: darkMode ? 'black' : 'white',
        color: darkMode && 'white'
      }}
    >
      <Toggle/>
      <Intro/>
      <About/>
      <Contact/>
    </div>
  );
}

export default App;
