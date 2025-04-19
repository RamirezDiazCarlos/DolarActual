import React from "react";
import { motion } from "framer-motion";

const CardDolar = ({ nombre, compra, venta, fecha, children, expandida, hoverable, onClick, style }) => (
    <motion.div
        layout="position"
        className={`card text-white bg-dark mb-3 shadow border border-secondary${hoverable ? " card-hover" : ""}`}
        style={{
            width: "100%",
            borderRadius: "0.75rem",
            transform: expandida ? "scale(1.03)" : "scale(1)",
            boxShadow: expandida
                ? "0 16px 40px rgba(0,0,0,0.7)"
                : "0 4px 8px rgba(0,0,0,0.3)",
            ...style
        }}
        transition={{
            type: "tween",
            duration: 1,
            ease: "linear"
        }}
        onClick={onClick}
    >
        <div className="card-body" style={{
            textAlign: expandida ? "center" : "left",
            transition: "all 0.8s cubic-bezier(.4,2,.6,1)",
            padding: expandida ? 0 : undefined
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
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </small>
        </div>
    </motion.div>
);

export default CardDolar;