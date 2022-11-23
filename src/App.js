import React from 'react';
import './index.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewChange from './components/NewChange';
import ApproveChange from './components/ApproveChange';
import PendingChange from './components/PendingChange';
import DeclinedChange from './components/DeclinedChange';
import OtpValidation from './pages/OtpValidation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/otpValidation' element={<OtpValidation />} />
        <Route path='/' element={<Dashboard />}>
          <Route path='newchange' element={<NewChange />} />
          <Route path='dashboard'/>
          <Route path='approvechange' element={<ApproveChange />} />
          <Route path='pendingchange' element={<PendingChange />} />
          <Route path='declinedchange' element={<DeclinedChange />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
