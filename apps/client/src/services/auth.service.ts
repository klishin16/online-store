import axios from "axios";
import { BASE_BACKEND_URL } from "@/constants";
import { ILoginResponse } from "@/types";

const register = (email: string, password: string) => {
    return axios.post(BASE_BACKEND_URL + "auth/register", {
        email,
        password,
    });
};

const login = async (email: string, password: string): Promise<string> => {
    return axios.post<ILoginResponse>(BASE_BACKEND_URL + "auth/login", {
        email,
        password,
    }).then(response => response.data.access_token);
};

export const AuthService = {
    register,
    login,
}
