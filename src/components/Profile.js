import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await updateProfile(user, {
        displayName: displayName
      });
      setMessage('Perfil actualizado correctamente');
    } catch (error) {
      setMessage('Error al actualizar: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Perfil (Ruta Protegida 2)</h1>
      <p>Esta es otra ruta protegida. Solo accesible para usuarios autenticados.</p>

      {user && (
        <div style={{ margin: '20px 0' }}>
          <h3>Información actual:</h3>
          <p>Email: {user.email}</p>
          <p>Nombre: {user.displayName || 'No establecido'}</p>
          <p>UID: {user.uid}</p>
        </div>
      )}

      <div style={{ margin: '30px 0' }}>
        <h3>Actualizar Perfil</h3>
        <form onSubmit={handleUpdateProfile}>
          <div style={{ marginBottom: '15px' }}>
            <label>Nombre para mostrar:</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>
          
          <button type="submit" style={{ padding: '8px 15px' }}>
            Actualizar
          </button>
        </form>

        {message && (
          <div style={{ marginTop: '10px', color: message.includes('Error') ? 'red' : 'green' }}>
            {message}
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/dashboard" style={{ marginRight: '10px' }}>
          Ir al Dashboard
        </Link>
        <Link to="/">
          Ir al Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;