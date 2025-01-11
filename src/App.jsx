import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const RequireAuth = ({ children }) => {
  const user = window.localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;