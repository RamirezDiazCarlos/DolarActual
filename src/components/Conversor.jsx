import React, { useEffect, useState, useCallback } from 'react';
import { fetchDolares } from '../services/dolarService';

const Conversor = () => {
    const [dolares, setDolares] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [monto, setMonto] = useState('');
    const [resultado, setResultado] = useState(null);
    const [aDolares, setADolares] = useState(false);
    const [precioSeleccionado, setPrecioSeleccionado] = useState(null);

    useEffect(() => {
        const obtenerDolares = async () => {
            try {
                const data = await fetchDolares();
                setDolares(data);
                setTipoSeleccionado(data[0]?.nombre || '');
            } catch (err) {
                console.error('Error al cargar los dólares:', err);
            }
        };

        obtenerDolares();
    }, []);

    const convertir = useCallback(() => {
        const dolar = dolares.find(d => d.nombre === tipoSeleccionado);
        if (!dolar || !monto) return;

        setPrecioSeleccionado(dolar);

        const valor = aDolares
            ? (parseFloat(monto) / dolar.venta).toFixed(2)
            : (parseFloat(monto) * dolar.venta).toFixed(2);

        setResultado(valor);
    }, [monto, tipoSeleccionado, aDolares, dolares]);

    useEffect(() => {
        convertir();
    }, [convertir]);

    return (
        <div className="container mt-4">
            <div className="bg-transparent text-white p-4 rounded shadow-sm mt-4">
                <h2 className="mb-4">Conversor</h2>

                <div className="row g-3 align-items-center">
                    <div className="col-md-5">
                        <label htmlFor="monto" className="form-label">Cantidad</label>
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "transparent", border: "none" }}>
                                <img
                                    src={aDolares ? "/ar.svg" : "/us.svg"}
                                    alt={aDolares ? "Peso argentino" : "Dólar estadounidense"}
                                    style={{ width: 24, height: 24 }}
                                />
                            </span>
                            <input
                                id="monto"
                                name="monto"
                                type="number"
                                className="form-control"
                                placeholder={`Monto en ${aDolares ? 'pesos' : 'dólares'}`}
                                value={monto}
                                onChange={e => setMonto(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-2 text-center">
                        <button
                            className="btn btn-light mt-4"
                            onClick={() => setADolares(!aDolares)}
                            title="Invertir"
                            aria-label="Invertir"
                        >
                            ⇄
                        </button>
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="resultado" className="form-label">Convertido a</label>
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "transparent", border: "none" }}>
                                <img
                                    src={aDolares ? "/us.svg" : "/ar.svg"}
                                    alt={aDolares ? "Dólar estadounidense" : "Peso argentino"}
                                    style={{ width: 24, height: 24 }}
                                />
                            </span>
                            <input
                                id="resultado"
                                name="resultado"
                                type="text"
                                className="form-control"
                                value={resultado || ''}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div className="row g-3 mt-4">
                    <div className="col-md-6">
                        <label htmlFor="tipoDolar" className="form-label">Tipo de dólar</label>
                        <select
                            id="tipoDolar"
                            name="tipoDolar"
                            className="form-select"
                            value={tipoSeleccionado}
                            onChange={e => setTipoSeleccionado(e.target.value)}
                        >
                            {dolares.map(d => (
                                <option key={d.nombre} value={d.nombre}>
                                    {d.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {precioSeleccionado && (
                        <div className="col-md-6">
                            <label className="form-label d-block">Precio actual</label>
                            <div className="bg border p-2 rounded">
                                <div>
                                    <strong>Compra:</strong> ${precioSeleccionado.compra}{" "}
                                    <strong>Venta:</strong> ${precioSeleccionado.venta}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Conversor;
