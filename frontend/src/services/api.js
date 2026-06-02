import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
});

// /-/-/ Adiciona interceptor para incluir token automaticamente /-/-/
api.interceptors.request.use(config => {
    const token = localStorage.getItem("ggpanel_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api; 
