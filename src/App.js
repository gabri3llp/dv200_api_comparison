import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Comparison from './Pages/Comparison';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Comparison" element={<Comparison />} />
        <Route path="/Timeline" element={<Comparison />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;