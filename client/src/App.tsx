import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Navbar from './Components/Layout/Navbar/Navbar';
import Footer from './Components/Layout/Footer/Footer';
import Containner from './Components/Layout/Container/Container';

// Pages
import Home from './Components/Pages/Home/Home';
import Register from './Components/Pages/Register/Register';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Containner>
          <Routes>
            <Route path='/register' element={<Register /> } />
            <Route path='/' element={<Home /> } />
          </Routes>
        </Containner>
        <Footer />
      </Router>
    </div>
  );
}

export default App;