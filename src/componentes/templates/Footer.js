import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className='bg-dark text-center text-white w-100'>
        <div className='container-fluid p-4 pb-0'>
          <div className='row'>
            {/* Columna izquierda: Android y App Store */}
            <div className='col-md-4 d-flex justify-content-start align-items-center'>
              <span className='me-3'>Encontranos en Play Store y App Store:</span>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#A4C639' }}
                href='https://play.google.com/store'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-android'></i>
              </a>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#000000' }}
                href='https://www.apple.com/app-store/'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-apple'></i>
              </a>
            </div>

            {/* Columna central: Enlace al formulario de contacto */}
            <div className='col-md-4 d-flex justify-content-center align-items-center'>
              <a
                href='/contacto'
                className='btn btn-light btn-lg text-dark'
                role='button'
              >
                Formulario de Contacto
              </a>
            </div>

            {/* Columna derecha: Redes sociales */}
            <div className='col-md-4 d-flex justify-content-end'>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#3b5998' }}
                href='https://facebook.com'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-facebook-f'></i>
              </a>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#55acee' }}
                href='https://twitter.com'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-twitter'></i>
              </a>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#dd4b39' }}
                href='https://google.com'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-google'></i>
              </a>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#ac2bac' }}
                href='https://instagram.com'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-instagram'></i>
              </a>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#0082ca' }}
                href='https://linkedin.com'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-linkedin-in'></i>
              </a>
              <a
                className='btn btn-primary btn-floating m-1'
                style={{ backgroundColor: '#333333' }}
                href='https://github.com'
                role='button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-github'></i>
              </a>
            </div>
          </div>
        </div>

        <div
          className='text-center p-3'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '100%' }}
        >
          © 2024 Copyright:
          <a className='text-white' href='https://mdbootstrap.com/'>
            Todos los derechos reservados.
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
