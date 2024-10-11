import React from 'react';
import Header from './componentes/Header';
import Carousel from './componentes/Carousel';
import Footer from './componentes/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container my-4">
      <Carousel />
      <Footer />
      </div>
      
    </div>
  );
}

export default App;
