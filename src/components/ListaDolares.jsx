import React, { useState, useEffect, useRef } from "react";
import CardDolar from "./CardDolar";
import GraficoDolar from "./GraficoDolar";
import { motion } from "framer-motion";

function normalizarNombre(nombre) {
    return nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

const endpointMap = {
    "contado con liquidacion": "contadoconliqui",
    "contado con liqui": "contadoconliqui",
    "mep": "mep",
    "blue": "blue",
    "oficial": "oficial",
};

const fetchHistorico = async (nombre) => {
    const nombreNormalizado = normalizarNombre(nombre);
    const endpoint = endpointMap[nombreNormalizado] || nombreNormalizado.replace(/\s+/g, '');
    try {
        const res = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${endpoint}`);
        if (!res.ok) {
            throw new Error(`Error al obtener histórico: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

const ListaDolares = ({ dolares }) => {
    const [seleccionada, setSeleccionada] = useState(null);
    const [historico, setHistorico] = useState({});
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef();

    const handleExpand = async (d) => {
        if (seleccionada === d.nombre) {
            setSeleccionada(null);
            return;
        }
        setSeleccionada(d.nombre);
        if (!historico[d.nombre]) {
            setLoading(true);
            const datos = await fetchHistorico(d.nombre);
            setHistorico(h => ({ ...h, [d.nombre]: datos }));
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!seleccionada) return;

        const actualizarHistorico = async () => {
            setLoading(true);
            const datos = await fetchHistorico(seleccionada);
            setHistorico(h => ({ ...h, [seleccionada]: datos }));
            setLoading(false);
        };

        actualizarHistorico();

        intervalRef.current = setInterval(actualizarHistorico, 300000);

        return () => clearInterval(intervalRef.current);
    }, [seleccionada]);

    return (
        <div className="container text-center mt-4">
            <h1 className="mb-4 ">Cotizaciones</h1>

            <div className="row g-4 justify-content-center">
                {dolares.map(d => {
                    const expandida = seleccionada === d.nombre;
                    return (
                        <motion.div
                            className={`col-12 ${!expandida ? "col-md-6 col-lg-4" : ""} d-flex justify-content-center card-col`}
                            key={d.nombre}
                            style={{
                                transition: "all 0.8s cubic-bezier(.4,2,.6,1)",
                                minHeight: expandida ? 420 : 0,
                            }}
                        >
                            <CardDolar
                                nombre={d.nombre}
                                compra={d.compra}
                                venta={d.venta}
                                fecha={d.fechaActualizacion}
                                expandida={expandida}
                                hoverable={!expandida}
                                onClick={() => handleExpand(d)}
                                style={{ width: expandida ? "100%" : 300, cursor: "pointer" }}
                            >
                                {expandida && (
                                    <div style={{ marginTop: 24, width: "100%", padding: "0 32px" }}>
                                        {loading && !historico[d.nombre] && <div>Cargando gráfico...</div>}
                                        {historico[d.nombre] && <GraficoDolar datos={historico[d.nombre]} />}
                                    </div>
                                )}
                            </CardDolar>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListaDolares;