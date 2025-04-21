import React, { useMemo, useEffect, useRef } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default function GraficoDolar({ datos, nombre }) {
    const chartRef = useRef(null);

    const dataPoints = useMemo(() => {
        if (!datos) return [];
        return datos.map(d => ({
            x: new Date(d.fecha),
            y: Number(d.venta)
        }));
    }, [datos]);

    const oneYearAgo = useMemo(() => {
        if (!dataPoints.length) return undefined;
        const lastDate = dataPoints[dataPoints.length - 1].x;
        const yearAgo = new Date(lastDate);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        const firstInRange = dataPoints.find(dp => dp.x >= yearAgo);
        return firstInRange ? firstInRange.x : dataPoints[0].x;
    }, [dataPoints]);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.render();
        }
        const timeout = setTimeout(() => {
            if (chartRef.current) {
                chartRef.current.render();
            }
        }, 400);
        return () => clearTimeout(timeout);
    }, [datos]);

    const options = {
        title: { text: `Histórico de ${nombre}`, fontColor: "#fff" },
        backgroundColor: "transparent",
        theme: "light2",
        charts: [{
            axisX: {
                crosshair: { enabled: true, snapToDataPoint: true, valueFormatString: "DD/MM/YY", labelFontColor: "#fff" },
                labelFontColor: "#fff",
                lineColor: "#fff",
                tickColor: "#fff"
            },
            axisY: {
                title: "Precio Venta",
                prefix: "$",
                crosshair: { enabled: true, snapToDataPoint: true, valueFormatString: "$#,###.##", labelFontColor: "#fff" },
                labelFontColor: "#fff",
                titleFontColor: "#fff",
                lineColor: "#fff",
                tickColor: "#fff"
            },
            toolTip: { shared: true, fontColor: "#fff", backgroundColor: "#222" },
            data: [{
                name: "Venta",
                type: "splineArea",
                color: "#2ac19d",
                yValueFormatString: "$#,###.##",
                xValueFormatString: "DD/MM/YY",
                dataPoints,
                lineColor: "#2ac19d",
                markerColor: "#2ac19d"
            }]
        }],
        navigator: {
            slider: {
                minimum: oneYearAgo,
                maximum: dataPoints.length ? dataPoints[dataPoints.length - 1].x : undefined
            }
        }
    };

    const containerProps = {
        width: "100%",
        height: "320px",
        margin: "auto"
    };

    if (!datos || datos.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    return (
        <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
            onRef={ref => chartRef.current = ref}
        />
    );
}