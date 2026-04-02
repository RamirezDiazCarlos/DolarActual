import { useState, useEffect, useCallback } from 'react';
import { ArrowsLeftRight, CaretDown } from '@phosphor-icons/react';

const Conversor = ({ dolares }) => {
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [monto, setMonto] = useState('');
    const [resultado, setResultado] = useState(null);
    const [aDolares, setADolares] = useState(false);
    const [precioSeleccionado, setPrecioSeleccionado] = useState(null);

    useEffect(() => {
        if (dolares.length && !tipoSeleccionado) {
            setTipoSeleccionado(dolares[0].nombre);
        }
    }, [dolares, tipoSeleccionado]);

    const convertir = useCallback(() => {
        const dolar = dolares.find(d => d.nombre === tipoSeleccionado);
        if (!dolar || !monto) return;
        setPrecioSeleccionado(dolar);
        const valor = aDolares
            ? (parseFloat(monto) / dolar.venta).toFixed(2)
            : (parseFloat(monto) * dolar.venta).toFixed(2);
        setResultado(valor);
    }, [monto, tipoSeleccionado, aDolares, dolares]);

    useEffect(() => { convertir(); }, [convertir]);

    const displayResult = resultado
        ? Number(resultado).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '';

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
                <p className="text-xs font-medium text-[#2ac19d] uppercase tracking-widest mb-1">Herramienta</p>
                <h2 className="text-3xl font-bold tracking-tight">Conversor</h2>
            </div>

            <div
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
                {/* Main row: amount / swap / result */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">

                    {/* From */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="monto" className="text-xs font-medium text-white/40 uppercase tracking-wider">
                            {aDolares ? 'Pesos argentinos' : 'Dólares'}
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 pointer-events-none">
                                <img src={aDolares ? "/ar.svg" : "/us.svg"} alt="" width="20" height="20" />
                            </span>
                            <input
                                id="monto"
                                name="monto"
                                type="number"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#2ac19d]/50 focus:ring-1 focus:ring-[#2ac19d]/25 transition-colors placeholder:text-white/20"
                                placeholder="0"
                                value={monto}
                                onChange={e => setMonto(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Swap */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setADolares(!aDolares)}
                            aria-label="Invertir conversión"
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-[#2ac19d] hover:border-[#2ac19d]/30 hover:bg-[#2ac19d]/5 transition-all active:scale-95"
                        >
                            <ArrowsLeftRight size={20} weight="bold" />
                        </button>
                    </div>

                    {/* To */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="resultado" className="text-xs font-medium text-white/40 uppercase tracking-wider">
                            {aDolares ? 'Dólares' : 'Pesos argentinos'}
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 pointer-events-none">
                                <img src={aDolares ? "/us.svg" : "/ar.svg"} alt="" width="20" height="20" />
                            </span>
                            <input
                                id="resultado"
                                name="resultado"
                                type="text"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#2ac19d] text-sm font-semibold cursor-default select-none"
                                value={displayResult}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* Second row: dollar type + current rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tipoDolar" className="text-xs font-medium text-white/40 uppercase tracking-wider">
                            Tipo de dólar
                        </label>
                        <div className="relative">
                            <select
                                id="tipoDolar"
                                name="tipoDolar"
                                className="w-full appearance-none bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2ac19d]/50 focus:ring-1 focus:ring-[#2ac19d]/25 cursor-pointer pr-9 transition-colors"
                                value={tipoSeleccionado}
                                onChange={e => setTipoSeleccionado(e.target.value)}
                            >
                                {dolares.map(d => (
                                    <option key={d.nombre} value={d.nombre}>{d.nombre}</option>
                                ))}
                            </select>
                            <CaretDown
                                size={14}
                                weight="bold"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                            />
                        </div>
                    </div>

                    {precioSeleccionado && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">
                                Precio actual
                            </label>
                            <div className="flex items-center gap-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm">
                                <span className="text-white/50">
                                    Compra{' '}
                                    <span className="font-semibold text-white">
                                        ${precioSeleccionado.compra.toLocaleString('es-AR')}
                                    </span>
                                </span>
                                <span className="w-px h-4 bg-white/15 shrink-0" />
                                <span className="text-white/50">
                                    Venta{' '}
                                    <span className="font-semibold text-[#2ac19d]">
                                        ${precioSeleccionado.venta.toLocaleString('es-AR')}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Conversor;
