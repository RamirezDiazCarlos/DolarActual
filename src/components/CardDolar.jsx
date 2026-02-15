const CardDolar = ({ nombre, compra, venta, fecha, onClick }) => (
    <div
        className="card text-white bg-dark mb-3 shadow border border-secondary card-hover"
        style={{ width: 300, borderRadius: "0.75rem", cursor: "pointer" }}
        onClick={onClick}
    >
        <div className="card-body">
            <h4 className="card-title">{nombre}</h4>
            <p className="card-text">
                Compra: <span style={{ fontWeight: 700 }}>${compra}</span>
            </p>
            <p className="card-text">
                Venta: <span style={{ fontWeight: 700 }}>${venta}</span>
            </p>
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
    </div>
);

export default CardDolar;
