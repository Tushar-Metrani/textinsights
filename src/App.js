
import './App.css';
import Navbar from './components/navbar';
import Form from './components/Form';
import About from './components/About';
import { useState } from 'react';
import Footer from './components/Footer';

import { BrowserRouter,Routes,Route,Navigate } from 'react-router';


const Style1 ={
  color:"white",
  backgroundColor:"#1b1b1d"
}

const Style2= {
  color:"#212529",
  backgroundColor:"white"
}
function App() {
  const [mode,setMode] = useState('light');
  const [theme,setTheme] =useState(Style2);

  const toggleMode = ()=>{
    if(mode==="light"){
      setMode("dark");
      setTheme(Style1);
      document.body.style.backgroundColor="#1b1b1d";
      
    }
    else{
      setMode("light")
      setTheme(Style2);
      document.body.style.backgroundColor="white";
    }
  }
  return (
    <>
      <BrowserRouter basename="/textinsights">
      <Navbar title="TextInsights" page1="Home" page2="About us" mode={mode} toggleMode={toggleMode} style={theme}/>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="/home" element={<Form heading="Enter Text to Analyze" mode={mode} style={theme}/>} />
        <Route path="/about" element={<About heading="About" mode={mode} style={theme}/>} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
