export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";
export const API_KEY = import.meta.env.VITE_API_KEY || "cartify123";

export const getApiUrl = (endpoint: string) => {
    // Ensure we don't have double slashes if API_URL ends with / and endpoint starts with /
    const baseUrl = API_URL.replace(/\/$/, "");
    const path = endpoint.replace(/^\//, "");
    return `${baseUrl}/${path}`;
};
