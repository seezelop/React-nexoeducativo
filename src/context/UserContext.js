import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';


// Creamos el contexto
export const UserContext = createContext();

// Proveedor del contexto para envolver la aplicación
export const UserProvider = ({ children }) => {
  const cookies = new Cookies();
  
  // Recuperar el rol desde las cookies si ya existe
  const [userRole, setUserRole] = useState(cookies.get('rol') || null);
  const [infoSesion, setInfoSesion] = useState(null);

  useEffect(() => {
    // Si el rol está en las cookies, actualizamos el estado
    if (userRole) {
      // Puedes cargar más información sobre el usuario desde la API si lo deseas
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/auth/info', { withCredentials: true });
          setInfoSesion(response.data);
        } catch (error) {
          console.error('Error al obtener la información del usuario', error);
        }
      };
      fetchUserInfo();
    }
  }, [userRole]);

  return (
    <UserContext.Provider value={{ userRole, setUserRole, infoSesion, setInfoSesion }}>
      {children}
    </UserContext.Provider>
  );
};
