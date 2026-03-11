import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Comparison from './Pages/Comparison';
import Timeline from './Pages/Timeline';
import Footsies from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
  <NavBar/>        
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Comparison" element={<Comparison />} />
    <Route path="/Timeline" element={<Timeline />} />
  </Routes>
  <Footsies/>
</BrowserRouter>
  );
}

export default App;