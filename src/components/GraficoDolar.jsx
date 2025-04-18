import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function GraficoDolar({ datos }) {
    if (!datos || datos.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }
    const ultimos6Meses = datos.slice(-180);
    const xAxis = ultimos6Meses.map(d => d.fecha);
    const yAxis = ultimos6Meses.map(d => d.venta);

    return (
        <LineChart
            xAxis={[{
                data: xAxis,
                scaleType: 'point',
                label: 'Fecha',
                tickLabelStyle: { fill: "#b2ebf2", fontSize: 10, angle: 45, textAnchor: "start" }
            }]}
            series={[
                {
                    data: yAxis,
                    area: true,
                    label: 'Venta',
                    color: "#40c4ff",
                    showMark: false,
                    areaFill: "#01708633",
                    highlightScope: "series",
                },
            ]}
            height={320}
            margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
            grid={{ vertical: false, horizontal: true }}
            sx={{
                background: "#0b444d",
                borderRadius: 8,
                padding: 2,
                color: "#fff",
                ".MuiChartsAxis-root .MuiChartsAxis-tickLabel": {
                    fill: "#b2ebf2"
                },
                ".MuiChartsLegend-root": {
                    color: "#fff"
                }
            }}
        />
    );
}