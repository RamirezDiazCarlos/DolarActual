# DolarActual

DolarActual es una web interactiva para consultar las cotizaciones de los distintos tipos de dólar en Argentina, visualizar su evolución histórica, convertir entre pesos y dólares, y consultar la inflación mensual. 

## Características

- Conversor de monedas entre pesos argentinos y diferentes tipos de dólar.
- Visualización de cotizaciones actualizadas: Oficial, Blue, MEP, Contado con Liqui, etc.
- Gráficos históricos diarios de cada tipo de dólar (últimos 6 meses).
- Consulta de inflación mensual con gráfico.
- Interfaz moderna, responsiva y fácil de usar.
- Fuente de datos: [ArgentinaDatos.com](https://www.argentinadatos.com/).

## Tecnologías

- React
- Bootstrap 5
- Framer Motion
- MUI X Charts
- ApexCharts
- API pública de ArgentinaDatos

## Estructura principal

- `src/components/Conversor.jsx`: Conversor de monedas.
- `src/components/ListaDolares.jsx`: Lista y cards de cotizaciones.
- `src/components/GraficoDolar.jsx`: Gráfico histórico de cada dólar.
- `src/components/Inflacion.jsx`: Gráfico de inflación mensual.
- `src/components/Footer.jsx`: Pie de página con créditos y fuente de datos.
- `src/hooks/useDolares.js`: Hook para obtener cotizaciones desde la API.

## Créditos

- Desarrollado por Carlos Ramírez Díaz.
- Fuente de datos: [ArgentinaDatos.com](https://www.argentinadatos.com/).
- GitHub: [RamirezDiazCarlos](https://github.com/RamirezDiazCarlos)

---

> Los valores mostrados son informativos y pueden diferir de los valores oficiales. No constituyen recomendación financiera.
