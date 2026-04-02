import { motion } from 'framer-motion';

const CardDolar = ({ nombre, compra, venta, fecha, onClick, featured = false }) => {
    const formatted = new Date(fecha).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <motion.div
            onClick={onClick}
            className={`relative w-full h-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 ${featured ? 'p-8' : 'p-6'}`}
            whileHover={{
                y: -3,
                boxShadow: '0 20px 48px rgba(42, 193, 157, 0.14)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
            {/* Top accent line for featured cards */}
            {featured && (
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#2ac19d]/35 to-transparent" />
            )}

            <p className="text-xs font-medium text-white/35 uppercase tracking-widest mb-3">
                {nombre}
            </p>

            <div className="flex items-end gap-6 mb-4">
                <div>
                    <p className="text-xs text-white/30 mb-1">Compra</p>
                    <p className={`font-bold text-white tabular-nums ${featured ? 'text-3xl' : 'text-2xl'}`}>
                        ${compra.toLocaleString('es-AR')}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-white/30 mb-1">Venta</p>
                    <p className={`font-bold text-[#2ac19d] tabular-nums ${featured ? 'text-3xl' : 'text-2xl'}`}>
                        ${venta.toLocaleString('es-AR')}
                    </p>
                </div>
            </div>

            <p className="text-xs text-white/20">{formatted}</p>
        </motion.div>
    );
};

export default CardDolar;
