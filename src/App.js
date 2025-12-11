
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
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="/home" element={<Form />} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
