import React from 'react';

function User() {
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
      <div className="container flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
        <h1>Bienvenido Usuario Común</h1>
        <p>Esta es la página para usuarios comunes. Aquí podrás ver información general.</p>
      </div>
      <footer className="bg-dark text-light text-center py-3 mt-auto"> {/* Footer con mt-auto para estar al final */}
        <p>© 2024 Copyright: Todos los derechos reservados.</p>
      </footer>
    </section>
  );
}

export default User;

