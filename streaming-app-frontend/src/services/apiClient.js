import axios from "axios";

let isRedirectingToLogin = false;

const AUTH_ROUTES = ["/authentication/login", "/authentication/registration"];

function shouldIgnoreAuthRedirect(config) {
    const requestUrl = config?.url || "";
    return AUTH_ROUTES.some((route) => requestUrl.includes(route));
}

function isExpiredJwtError(error) {
    const status = error?.response?.status;
    const payload = error?.response?.data;

    const bodyText = typeof payload === "string"
        ? payload
        : JSON.stringify(payload || {});

    return (
        status === 401 ||
        status === 403 ||
        bodyText.includes("ExpiredJwtException") ||
        bodyText.includes("JWT expired")
    );
}

function redirectToLogin() {
    sessionStorage.removeItem("token");

    if (window.location.pathname !== "/login" && !isRedirectingToLogin) {
        isRedirectingToLogin = true;
        window.location.href = "/login";
    }
}

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8080",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    },
);

apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const config = error?.config;

        if (!shouldIgnoreAuthRedirect(config) && isExpiredJwtError(error)) {
            redirectToLogin();
        }

        return Promise.reject(error);
    },
);

export default apiClient;