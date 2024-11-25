import React from 'react';
import { Slot } from 'expo-router'; // Permite renderizar rotas dinamicamente
import { AuthProvider } from '../assets/components/authContext';

const Layout: React.FC = () => {
  return (
    <AuthProvider>
      {/* Renderiza a página correspondente à rota atual */}
      <Slot />
    </AuthProvider>
  );
};

export default Layout;
