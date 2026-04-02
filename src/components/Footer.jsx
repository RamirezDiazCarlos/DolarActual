const Footer = () => (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-10 mt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
                <p className="text-sm text-white/35">
                    Datos:{' '}
                    <a
                        href="https://www.argentinadatos.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2ac19d] hover:opacity-75 transition-opacity"
                    >
                        ArgentinaDatos.com
                    </a>
                    {' '}·{' '}
                    <a
                        href="https://dolarapi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2ac19d] hover:opacity-75 transition-opacity"
                    >
                        DolarApi.com
                    </a>
                </p>
                <p className="text-xs text-white/20 mt-1">
                    © {new Date().getFullYear()} DolarActual — Desarrollado por{' '}
                    <a
                        href="https://www.kerneldev.com.ar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-[#2ac19d] transition-colors"
                    >
                        KERNEL
                    </a>
                </p>
            </div>
            <a
                href="https://github.com/RamirezDiazCarlos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="opacity-30 hover:opacity-60 transition-opacity"
            >
                <img src="/github.svg" alt="GitHub" width={24} height={24} />
            </a>
        </div>
        <p className="text-xs text-white/18 mt-6 max-w-2xl">
            Los valores son informativos y pueden diferir de los valores oficiales. No constituyen recomendación financiera.
        </p>
    </footer>
);

export default Footer;
