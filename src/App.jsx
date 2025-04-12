
import React, { useEffect, useState } from "react";
import { fetchDolares } from "./services/dolarService";
import CardDolar from "./components/CardDolar";
import './App.css'

function App() {

  const [dolares, setDolares] = useState([]);
  const [error, setError] = useState(null);

  const getDolares = async () => {
    try {
      const data = await fetchDolares();
      setDolares(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getDolares();
    const interval = setInterval(getDolares, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [])

  if (error) return <p>Error: {error}</p>
  if (!dolares.length) return <p>Cargando datos...</p>;

  return (
    <div className="justify-content-center gradient-bg">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container justify-content-center">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="/logoCotizAR.png" width="56" alt="CotizAR" />
            <span className="fw-bold">CotizAR</span>
          </a>
        </div>
      </nav>
      <div className="container text-center mt-4">
      <h1 className="mb-2">Cotizaciones</h1>
      {dolares[0]?.fechaActualizacion && (
        <p className="actualizacion-general">
          Actualizado: {new Date(dolares[0].fechaActualizacion).toLocaleDateString('es-AR')}
        </p>
      )}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {dolares.map(d => (
            <div className="col d-flex justify-content-center" key={d.nombre}>
              <CardDolar
                nombre={d.nombre}
                compra={d.compra}
                venta={d.venta}
                fecha={d.fechaActualizacion}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
