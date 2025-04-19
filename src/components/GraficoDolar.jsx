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
        <div style={{ width: "100%", minWidth: 0 }}>
            <LineChart
                xAxis={[{
                    data: xAxis,
                    scaleType: 'point',
                    label: 'Fecha',
                    tickLabelStyle: { fill: "#fff", fontSize: 10, angle: 45, textAnchor: "start" }
                }]}
                series={[
                    {
                        data: yAxis,
                        area: true,
                        label: 'Venta',
                        color: "#2ac19d",
                        showMark: false,
                        areaFill: "#2ac19d33",
                        highlightScope: "series",
                    },
                ]}
                width={undefined}
                height={window.innerWidth < 600 ? 220 : 320}
                margin={{ left: 40, right: 10, top: 20, bottom: 60 }}
                grid={{ vertical: false, horizontal: true }}
                sx={{
                    background: "transparent",
                    borderRadius: 12,
                    padding: 0,
                    color: "#fff",
                    ".MuiChartsAxis-root .MuiChartsAxis-tickLabel": {
                        fill: "#fff"
                    },
                    ".MuiChartsLegend-root": {
                        color: "#fff"
                    }
                }}
            />
        </div>
    );
}