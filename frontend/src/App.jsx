import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import UploadCsv from './UploadCsv';
import ViewCsv from './ViewCsv';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!token ? (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/upload">Upload CSV</Link>
            <Link to="/view">View Data</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/upload" element={<UploadCsv />} />
        <Route path="/view" element={<ViewCsv />} />
      </Routes>
    </Router>
  );
}

export default App;
