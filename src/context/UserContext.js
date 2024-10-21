import React, { createContext, useState } from 'react';

// Creamos el contexto
export const UserContext = createContext();

// Proveedor del contexto para envolver la aplicación
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);  // Almacena el rol del usuario

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
