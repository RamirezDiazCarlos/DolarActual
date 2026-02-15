import { useState, useEffect, useRef, lazy, Suspense } from "react";
import CardDolar from "./CardDolar";

const GraficoDolar = lazy(() => import("./GraficoDolar"));

function normalizarNombre(nombre) {
    return nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

// Mapeo de nombres normalizados (dolarapi.com) → endpoints válidos (argentinadatos.com)
// Válidos: oficial, blue, bolsa, contadoconliqui, cripto, mayorista, solidario, turista
const endpointMap = {
    "contado con liquidacion": "contadoconliqui",
    "tarjeta": "solidario",
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

    const dolarSeleccionado = dolares.find(d => d.nombre === seleccionada);

    const abrirModal = async (d) => {
        setSeleccionada(d.nombre);
        if (!historico[d.nombre]) {
            setLoading(true);
            const datos = await fetchHistorico(d.nombre);
            setHistorico(h => ({ ...h, [d.nombre]: datos }));
            setLoading(false);
        }
    };

    const cerrarModal = () => {
        setSeleccionada(null);
    };

    useEffect(() => {
        if (!seleccionada) return;

        const actualizarHistorico = async () => {
            const datos = await fetchHistorico(seleccionada);
            setHistorico(h => ({ ...h, [seleccionada]: datos }));
        };

        intervalRef.current = setInterval(actualizarHistorico, 300000);
        return () => clearInterval(intervalRef.current);
    }, [seleccionada]);

    // Cerrar modal con Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") cerrarModal();
        };
        if (seleccionada) {
            document.addEventListener("keydown", handleKey);
            return () => document.removeEventListener("keydown", handleKey);
        }
    }, [seleccionada]);

    return (
        <div className="container text-center mt-4">
            <h1 className="mb-4">Cotizaciones</h1>

            <div className="row g-4 justify-content-center">
                {dolares.map(d => (
                    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={d.nombre}>
                        <CardDolar
                            nombre={d.nombre}
                            compra={d.compra}
                            venta={d.venta}
                            fecha={d.fechaActualizacion}
                            onClick={() => abrirModal(d)}
                        />
                    </div>
                ))}
            </div>

            {/* Modal */}
            {seleccionada && (
                <div
                    className="modal-backdrop-custom"
                    onClick={cerrarModal}
                >
                    <div
                        className="modal-content-custom"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="btn-close btn-close-white modal-close-btn"
                            onClick={cerrarModal}
                            aria-label="Cerrar"
                        />

                        {dolarSeleccionado && (
                            <>
                                <h2 className="modal-title-custom">{dolarSeleccionado.nombre}</h2>
                                <div className="modal-prices">
                                    <span>Compra: <strong>${dolarSeleccionado.compra}</strong></span>
                                    <span>Venta: <strong>${dolarSeleccionado.venta}</strong></span>
                                </div>
                                <small className="text-muted">
                                    Actualizado: {new Date(dolarSeleccionado.fechaActualizacion).toLocaleString("es-AR", {
                                        day: "2-digit", month: "2-digit", year: "2-digit",
                                        hour: "2-digit", minute: "2-digit",
                                    })}
                                </small>
                            </>
                        )}

                        <div className="modal-chart">
                            {loading && !historico[seleccionada]
                                ? <div className="text-center py-4">Cargando gráfico...</div>
                                : historico[seleccionada]
                                    ? <Suspense fallback={<div className="text-center py-4">Cargando gráfico...</div>}>
                                        <GraficoDolar datos={historico[seleccionada]} nombre={seleccionada} />
                                      </Suspense>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaDolares;
