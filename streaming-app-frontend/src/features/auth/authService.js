import apiClient from "../../services/apiClient"

export const registerUser = async (registrationData) => {
    const response = await apiClient.post(
        "/authentication/registration",
        registrationData
    );

    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await apiClient.post(
        "/authentication/login",
        loginData
    );

    return response.data;
};