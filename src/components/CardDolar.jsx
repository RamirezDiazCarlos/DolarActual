import React from "react";
import { motion } from "framer-motion";

const CardDolar = ({ nombre, compra, venta, fecha, children, expandida }) => (
    <motion.div
        layout
        className="card text-white bg-dark mb-3 shadow border border-secondary"
        style={{
            width: "100%",
            borderRadius: "0.75rem",
            transform: expandida ? "scale(1.03)" : "scale(1)",
            boxShadow: expandida
                ? "0 16px 40px rgba(0,0,0,0.7)"
                : "0 4px 8px rgba(0,0,0,0.3)",
        }}
        transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
        }}
    >
        <div className="card-body" style={{
            textAlign: expandida ? "center" : "left",
            transition: "all 0.8s cubic-bezier(.4,2,.6,1)"
        }}>
            <h4
                className="card-title"
                style={{
                    fontSize: expandida ? "2.5rem" : "1.5rem",
                    fontWeight: expandida ? 800 : 600,
                    letterSpacing: expandida ? "2px" : "normal",
                    marginBottom: expandida ? 24 : 12,
                    transition: "all 0.4s cubic-bezier(.4,2,.6,1)"
                }}
            >
                {nombre}
            </h4>
            <p className="card-text" style={{
                fontSize: expandida ? "1.5rem" : "1rem",
                marginBottom: expandida ? 16 : 8,
                fontWeight: expandida ? 600 : 400,
                transition: "all 0.4s cubic-bezier(.4,2,.6,1)"
            }}>
                Compra: <span style={{ fontWeight: 700 }}>${compra}</span>
            </p>
            <p className="card-text" style={{
                fontSize: expandida ? "1.5rem" : "1rem",
                marginBottom: expandida ? 24 : 8,
                fontWeight: expandida ? 600 : 400,
                transition: "all 0.4s cubic-bezier(.4,2,.6,1)"
            }}>
                Venta: <span style={{ fontWeight: 700 }}>${venta}</span>
            </p>
            {children}
        </div>
        <div className="card-footer">
            <small className="card-text">
                Actualizado: {new Date(fecha).toLocaleString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </small>
        </div>
    </motion.div>
);

export default CardDolar;