import React from "react";

const Footer = () => (
    <footer className="text-center mt-5 py-4" style={{  color: "#fff" }}>
        <p>
            Fuente de datos:{" "}
            <a
                href="https://www.argentinadatos.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#40c4ff" }}
            >
                ArgentinaDatos.com
            </a>
        </p>
        <p>
            © {new Date().getFullYear()} DolarActual — Desarrollado por Carlos Ramírez Díaz
        </p>
        <p>
            <a
                href="https://github.com/RamirezDiazCarlos"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block" }}
                title="GitHub"
            >
                <img src="/github.svg" alt="GitHub" width={32} height={32} style={{ verticalAlign: "middle" }} />
            </a>
        </p>
        <p style={{ fontSize: "0.9rem", color: "#b2ebf2" }}>
            Los valores mostrados son informativos y pueden diferir de los valores oficiales. No constituyen recomendación financiera.
        </p>
    </footer>
);

export default Footer;