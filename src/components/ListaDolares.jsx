import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
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

const endpointMap = {
    "contado con liquidacion": "contadoconliqui",
    "tarjeta": "solidario",
};

// Bento grid config: wide cards take 2 of 3 columns, featured = larger text
const WIDE_CARDS = new Set(['oficial', 'cripto']);
const FEATURED_CARDS = new Set(['oficial', 'blue']);

function getCardConfig(nombre) {
    const key = normalizarNombre(nombre);
    return {
        wide: WIDE_CARDS.has(key),
        featured: FEATURED_CARDS.has(key),
    };
}

const fetchHistorico = async (nombre) => {
    const normalizado = normalizarNombre(nombre);
    const endpoint = endpointMap[normalizado] || normalizado.replace(/\s+/g, '');
    try {
        const res = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${endpoint}`);
        if (!res.ok) throw new Error(`${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

function ChartSkeleton() {
    return (
        <div className="w-full h-[320px] rounded-xl bg-white/5 animate-pulse flex items-end gap-1.5 px-4 pb-4 pt-8">
            {[40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 50, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t" style={{ height: `${h}%` }} />
            ))}
        </div>
    );
}

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

    const cerrarModal = () => setSeleccionada(null);

    useEffect(() => {
        if (!seleccionada) return;
        const actualizarHistorico = async () => {
            const datos = await fetchHistorico(seleccionada);
            setHistorico(h => ({ ...h, [seleccionada]: datos }));
        };
        intervalRef.current = setInterval(actualizarHistorico, 300000);
        return () => clearInterval(intervalRef.current);
    }, [seleccionada]);

    useEffect(() => {
        if (!seleccionada) return;
        const handleKey = (e) => { if (e.key === "Escape") cerrarModal(); };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [seleccionada]);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
                <p className="text-xs font-medium text-[#2ac19d] uppercase tracking-widest mb-1">
                    Tipos de cambio
                </p>
                <h1 className="text-3xl font-bold tracking-tight">Cotizaciones</h1>
            </div>

            {/* Bento grid: 3 cols on desktop, 1 col on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dolares.map(d => {
                    const { wide, featured } = getCardConfig(d.nombre);
                    return (
                        <div key={d.nombre} className={wide ? 'md:col-span-2' : ''}>
                            <CardDolar
                                nombre={d.nombre}
                                compra={d.compra}
                                venta={d.venta}
                                fecha={d.fechaActualizacion}
                                onClick={() => abrirModal(d)}
                                featured={featured}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Modal with Framer Motion AnimatePresence */}
            <AnimatePresence>
                {seleccionada && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        onClick={cerrarModal}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)' }}
                    >
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, scale: 0.96, y: 14 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 14 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-[#0c2028] border border-white/15 rounded-2xl w-full max-w-3xl max-h-[90dvh] overflow-y-auto"
                            style={{
                                boxShadow: '0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
                            }}
                        >
                            {dolarSeleccionado && (
                                <>
                                    {/* Header */}
                                    <div className="flex items-start justify-between p-6 border-b border-white/10">
                                        <div>
                                            <p className="text-xs font-medium text-[#2ac19d] uppercase tracking-widest mb-1">
                                                Histórico
                                            </p>
                                            <h2 className="text-2xl font-bold tracking-tight">
                                                {dolarSeleccionado.nombre}
                                            </h2>
                                        </div>
                                        <button
                                            onClick={cerrarModal}
                                            aria-label="Cerrar"
                                            className="p-2 rounded-xl text-white/35 hover:text-white hover:bg-white/8 transition-colors mt-0.5"
                                        >
                                            <X size={20} weight="bold" />
                                        </button>
                                    </div>

                                    {/* Prices */}
                                    <div className="grid grid-cols-2 gap-3 p-6 pb-3">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <p className="text-xs text-white/35 uppercase tracking-wider mb-1.5">Compra</p>
                                            <p className="text-2xl font-bold text-white tabular-nums">
                                                ${dolarSeleccionado.compra.toLocaleString('es-AR')}
                                            </p>
                                        </div>
                                        <div
                                            className="border border-[#2ac19d]/20 rounded-xl p-4"
                                            style={{ background: 'rgba(42,193,157,0.07)' }}
                                        >
                                            <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: 'rgba(42,193,157,0.5)' }}>
                                                Venta
                                            </p>
                                            <p className="text-2xl font-bold text-[#2ac19d] tabular-nums">
                                                ${dolarSeleccionado.venta.toLocaleString('es-AR')}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-white/25 px-6 pb-1">
                                        Actualizado:{' '}
                                        {new Date(dolarSeleccionado.fechaActualizacion).toLocaleString("es-AR", {
                                            day: "2-digit", month: "2-digit", year: "2-digit",
                                            hour: "2-digit", minute: "2-digit",
                                        })}
                                    </p>

                                    {/* Chart */}
                                    <div className="p-6">
                                        {loading && !historico[seleccionada] ? (
                                            <ChartSkeleton />
                                        ) : historico[seleccionada] ? (
                                            <Suspense fallback={<ChartSkeleton />}>
                                                <GraficoDolar
                                                    datos={historico[seleccionada]}
                                                    nombre={seleccionada}
                                                />
                                            </Suspense>
                                        ) : null}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ListaDolares;
