import React, { useEffect, useState } from "react";
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
                        height: 450,
                        type: 'bar',
                        background: 'transparent',
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 6,
                            dataLabels: {
                                position: 'top',
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: val => `${val.toFixed(1)}%`,
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ["#2ac19d"]
                        }
                    },
                    xaxis: {
                        categories: etiquetas,
                        position: 'bottom',
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        tooltip: { enabled: true },
                        labels: {
                            style: {
                                colors: '#fff'
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            formatter: val => `${val}%`,
                            style: {
                                colors: '#fff'
                            }
                        }
                    },
                    title: {
                        text: 'Inflación mensual en Argentina',
                        align: 'center',
                        style: {
                            color: '#fff',
                            fontSize: '16px'
                        }
                    },
                    grid: {
                        borderColor: '#444'
                    },
                    theme: {
                        mode: 'dark'
                    }
                });
            });
    }, []);

    return (
        <div className="bg-[#0f3d42] p-4 rounded-xl shadow-md mt-6 max-w-3xl mx-auto">
            <ReactApexChart options={options} series={series} type="bar" height={450} />
        </div>
    );
};

export default Inflacion;
