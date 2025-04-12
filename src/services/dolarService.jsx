export const fetchDolares = async () => {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    if (!response.ok) throw new Error('Error al cargar los datos');
    return response.json();
}