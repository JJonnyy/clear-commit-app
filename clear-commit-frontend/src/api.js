import axios from "axios";

const isDev = import.meta.env.MODE === 'development';

export const api = axios.create({
    baseURL: isDev ? '/portfolio/api' : import.meta.env.VITE_API_URL,
    withCredentials: true,
});