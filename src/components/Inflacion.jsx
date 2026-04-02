import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Inflacion = () => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion')
            .then(res => res.json())
            .then(data => {
                const ultimos12 = data
                    .filter(item => item.fecha && item.valor !== null)
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .slice(0, 12)
                    .reverse();
                const valores = ultimos12.map(d => d.valor);
                const etiquetas = ultimos12.map(d =>
                    new Date(d.fecha).toLocaleDateString('es-AR', { month: 'short', year: '2-digit' })
                );

                setSeries([{ name: "Inflación", data: valores }]);
                setOptions({
                    chart: {
                        height: 380,
                        type: 'bar',
                        background: 'transparent',
                        toolbar: { show: false },
                        fontFamily: 'Outfit, sans-serif',
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 6,
                            dataLabels: { position: 'top' },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: val => `${val.toFixed(1)}%`,
                        offsetY: -20,
                        style: {
                            fontSize: '11px',
                            fontWeight: '500',
                            colors: ["#2ac19d"],
                        }
                    },
                    xaxis: {
                        categories: etiquetas,
                        position: 'bottom',
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        tooltip: { enabled: true },
                        labels: { style: { colors: 'rgba(240,250,250,0.4)', fontSize: '12px' } }
                    },
                    yaxis: {
                        labels: {
                            formatter: val => `${val}%`,
                            style: { colors: 'rgba(240,250,250,0.4)', fontSize: '12px' }
                        }
                    },
                    title: {
                        text: 'Últimos 12 meses',
                        align: 'left',
                        style: { color: 'rgba(240,250,250,0.5)', fontSize: '13px', fontWeight: '500' }
                    },
                    grid: {
                        borderColor: 'rgba(255,255,255,0.06)',
                        strokeDashArray: 4,
                    },
                    theme: { mode: 'dark' },
                    colors: ['#2ac19d'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'vertical',
                            shadeIntensity: 0.4,
                            gradientToColors: ['rgba(42,193,157,0.5)'],
                            stops: [0, 100],
                        }
                    },
                });
            })
            .catch(err => console.error('Error al cargar inflación:', err));
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
                <p className="text-xs font-medium text-[#2ac19d] uppercase tracking-widest mb-1">Indicadores</p>
                <h2 className="text-3xl font-bold tracking-tight">Inflación</h2>
            </div>
            <div
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
                <ReactApexChart options={options} series={series} type="bar" height={380} />
            </div>
        </section>
    );
};

export default Inflacion;
