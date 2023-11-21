import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Admin from './Admin/Admin';

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
