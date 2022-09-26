import './index.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NewChange from './components/NewChange';
import ApproveChange from './components/ApproveChange';
import PendingChange from './components/PendingChange';
import RejectedChange from './components/RejectedChange';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <Route path='newchange' element={<NewChange />} />
          <Route path='dashboard'/>
          <Route path='approvechange' element={<ApproveChange />} />
          <Route path='pendingchange' element={<PendingChange />} />
          <Route path='rejectedchange' element={<RejectedChange />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
