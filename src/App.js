
import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';
import About from './components/About';
import Footer from './components/Footer';

import { BrowserRouter,Routes,Route,Navigate } from 'react-router';


function App() {

  return (
    <>
      <BrowserRouter basename="/textinsights">
      <Navbar title="TextInsights" page1="Home" page2="About us"/>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="/home" element={<Form heading="Enter Text to Analyze"/>} />
        <Route path="/about" element={<About heading="About"/>} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
