const CardDolar = ({ nombre, compra, venta, fecha }) => (
    <div className="card text-white bg-dark mb-3 shadow border border-secondary" style={{
        width: "300px", transition: "transform 0.2s ease, box-shadow 0.2s ease",
        borderRadius: "0.75rem"
    }} onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
    }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        }}>
        <div className="card-body">
            <h4 className="card-title">{nombre}</h4>
            <p className="card-text">Compra: ${compra}</p>
            <p className="card-text">Venta: ${venta}</p>
        </div>
        <div className="card-footer">
            <small className="card-text">
                Actualizado: {new Date(fecha).toLocaleString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </small>
        </div>
    </div>
);

export default CardDolar