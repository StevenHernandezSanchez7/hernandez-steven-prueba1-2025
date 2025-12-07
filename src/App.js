import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando aplicación...</div>;
  }

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
              <Link to="/profile" style={{ marginRight: '15px' }}>Perfil</Link>
              <span>Usuario: {user.email}</span>
            </>
          )}
        </nav>

        <Routes>
          {/* Ruta pública - Home */}
          <Route path="/" element={
            <div>
              <h1>Home - Página Pública</h1>
              <p>Cualquier usuario puede ver esta página.</p>
              {user ? (
                <p>Estás autenticado como: {user.email}</p>
              ) : (
                <p>No estás autenticado. <Link to="/login">Inicia sesión</Link> para acceder a rutas protegidas.</p>
              )}
            </div>
          } />

          {/* Ruta pública - Login */}
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" replace /> : <Login />
          } />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          {/* Ruta 404 */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;