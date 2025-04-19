import React from 'react';
import './App.css'
import Inflacion from "./components/Inflacion";
import Conversor from "./components/Conversor";
import Navbar from "./components/Navbar";
import ListaDolares from "./components/ListaDolares";
import useDolares from "./hooks/useDolares";
import Footer from './components/Footer';

function App() {

  const { dolares, error } = useDolares();

  if (error) return <p>Error: {error}</p>
  if (!dolares.length) return <p>Cargando datos...</p>;

  return (
    <div className="justify-content-center gradient-bg">
      <Navbar />
      <Conversor/>
      <ListaDolares dolares={dolares} />
      <Inflacion />
      <Footer />
    </div>
  )
}

export default App
