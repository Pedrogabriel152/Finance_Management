import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Navbar from './Components/Layout/Navbar/Navbar';
import Footer from './Components/Layout/Footer/Footer';
import Containner from './Components/Layout/Container/Container';

// Pages
import Home from './Components/Pages/Home/Home';
import Register from './Components/Pages/Register/Register';
import Login from './Components/Pages/Login/Login';
import Profile from './Components/Pages/Profile/Profile';
import MyCDs from './Components/Pages/MyCDs/MyCDs';
import AddCD from './Components/Pages/AddCD/AddCD';

// Provider
import { RecordCompanyProvider } from './Context/useContext';

function App() {
  return (
    <div className="App">
      <Router>
        <RecordCompanyProvider>
          <Navbar />
          <Containner>
            <Routes>
              <Route path='/cd/add' element={<AddCD />} />
              <Route path='/cd/mycds' element={<MyCDs /> } />
              <Route path='/recordcompany/profile' element={<Profile /> } />
              <Route path='/login' element={<Login /> }/>
              <Route path='/register' element={<Register /> } />
              <Route path='/' element={<Home /> } />
            </Routes>
          </Containner>
          <Footer />
        </RecordCompanyProvider>
      </Router>
    </div>
  );
}

export default App;