import React, { createContext, useState } from 'react';
import Cookies from 'universal-cookie';

// Creamos el contexto
export const UserContext = createContext();

// Proveedor del contexto para envolver la aplicación
export const UserProvider = ({ children }) => {
  const cookies = new Cookies();
 // console.log('valor almacenado en la cookie'+cookies.get('rol'));
  const [userRole, setUserRole] = useState(cookies.get('rol'));  // Almacena el rol del usuario
  //console.log('valor del usuario guardado en el estado: '+userRole)
  const[infoSesion, setInfoSesion] = useState(null)
  return (
    <UserContext.Provider value={{ userRole, setUserRole, infoSesion, setInfoSesion }}>
      {children}
    </UserContext.Provider>
  );
};
