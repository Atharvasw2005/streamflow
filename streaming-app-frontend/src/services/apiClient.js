import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8080",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    }
);

apiClient.interceptors.request.use(
    (config) => {
        const tocken = sessionStorage.getItem("tocken");
        if (tocken) {
            config.headers.Authorization = `Bearer ${tocken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;