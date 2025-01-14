import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GettingStarted from './pages/GettingStarted';

const RequireAuth = ({ children }) => {
  const user = window.localStorage.getItem("user");
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LoginPage></LoginPage>
      </GoogleOAuthProvider>
    )
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route path="/" element={<GoogleAuthWrapper />} />
          <Route path="/get-started" element={<GettingStarted />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;