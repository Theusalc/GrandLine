import React from 'react';
import { AuthProvider } from '../assets/components/authContext';
import LoginPage from './loginPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
};

export default App;
