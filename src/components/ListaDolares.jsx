import React from "react";
import CardDolar from "./CardDolar";

const ListaDolares = ({ dolares }) => {
    return (
        <div className="container text-center mt-4">
            <h1 className="mb-2">Cotizaciones</h1>

            {dolares[0]?.fechaActualizacion && (
                <p className="actualizacion-general">
                    Actualizado: {new Date(dolares[0].fechaActualizacion).toLocaleDateString('es-AR')}
                </p>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                {dolares.map(d => (
                    <div className="col d-flex justify-content-center" key={d.nombre}>
                        <CardDolar
                            nombre={d.nombre}
                            compra={d.compra}
                            venta={d.venta}
                            fecha={d.fechaActualizacion}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaDolares;