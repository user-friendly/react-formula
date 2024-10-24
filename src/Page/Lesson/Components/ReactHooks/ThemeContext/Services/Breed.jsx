
const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/theme-context/breeds`

export const getBreeds = () => fetch(ENDPOINT_URL);
