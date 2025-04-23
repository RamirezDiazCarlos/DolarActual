import React from 'react';
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Cotizador de Dólar Actual</title>
        <meta name="description" content="Consulta el valor actualizado del dólar, gráficos históricos y conversor de divisas en Argentina." />
        <meta name="keywords" content="dólar, cotización, argentina, blue, oficial, mep, contado con liqui, conversor, inflación" />
        <meta name="author" content="Tu Nombre o Proyecto" />
        <meta property="og:title" content="Cotizador de Dólar Actual" />
        <meta property="og:description" content="Cotizaciones actualizadas, gráficos históricos y conversor de divisas en Argentina." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cotizador de Dólar Actual" />
        <meta name="twitter:description" content="Cotizaciones actualizadas, gráficos históricos y conversor de divisas en Argentina." />
        <link rel="icon" href="/DolarActual/public/logo.png" />
      </Helmet>
      <Navbar />
      <Conversor />
      <ListaDolares dolares={dolares} />
      <Inflacion />
      <Footer />
    </div>
  )
}

export default App
