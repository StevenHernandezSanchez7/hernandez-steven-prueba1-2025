import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard (Ruta Protegida 1)</h1>
      <p>Esta es una ruta protegida. Solo usuarios autenticados pueden verla.</p>
      
      {user && (
        <div>
          <p>Bienvenido: {user.email}</p>
          <p>UID: {user.uid}</p>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
          Cerrar Sesión
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Otras rutas:</h3>
        <Link to="/profile" style={{ marginRight: '10px' }}>
          Ir al Perfil
        </Link>
        <Link to="/">
          Ir al Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;