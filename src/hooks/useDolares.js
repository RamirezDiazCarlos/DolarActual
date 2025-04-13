import { useState, useEffect } from "react";
import { fetchDolares } from "../services/dolarService";

const useDolares = () => {
    const [dolares, setDolares] = useState([]);
    const [error, setError] = useState(null);

    const getDolares = async () => {
        try {
            const data = await fetchDolares();
            setDolares(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getDolares();
        const interval = setInterval(getDolares, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return { dolares, error };
};

export default useDolares;
