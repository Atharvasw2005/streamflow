import apiClient from "../../services/apiClient";

const TOKEN_STORAGE_KEY = "token";

function decodeBase64Url(value) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");

    return atob(padded);
}

function decodeJwtPayload(token) {
    try {
        const payloadPart = token.split(".")[1];
        if (!payloadPart) return null;

        return JSON.parse(decodeBase64Url(payloadPart));
    } catch {
        return null;
    }
}

function getRoleFromPayload(payload) {
    return payload?.role || payload?.roles?.[0] || payload?.authorities?.[0] || null;
}

export function getAuthToken() {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearAuthSession() {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function saveAuthSessionFromLogin(loginResponse) {
    const token =
        loginResponse?.token || loginResponse?.jwt || loginResponse?.accessToken || loginResponse?.message;

    if (!token) {
        throw new Error("Token was not found in login response");
    }

    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);

    return token;
}

export function isAuthenticated() {
    return Boolean(getAuthToken());
}

export function getCurrentUserRole() {
    const token = getAuthToken();
    if (!token) return null;

    const payload = decodeJwtPayload(token);
    return getRoleFromPayload(payload);
}

export function isAdminOrSuperAdmin() {
    const role = getCurrentUserRole();
    return role === "ADMIN" || role === "SUPER_ADMIN";
}

export function isSuperAdmin() {
    return getCurrentUserRole() === "SUPER_ADMIN";
}

export const registerUser = async (registrationData) => {
    const response = await apiClient.post(
        "/authentication/registration",
        registrationData,
    );

    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await apiClient.post(
        "/authentication/login",
        loginData,
    );

    return response.data;
};