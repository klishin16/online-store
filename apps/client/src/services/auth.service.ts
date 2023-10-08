import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { ILoginResponse } from "@/types";
import { IBrand, IUser } from "@/models";

const register = (email: string, password: string) => {
    return axios.post(BACKEND_URL + "auth/register", {
        email,
        password,
    });
};

const login = async (email: string, password: string): Promise<string> => {
    console.log('BACKEND_URL', BACKEND_URL)
    return axios.post<ILoginResponse>(BACKEND_URL + "auth/login", {
        email,
        password,
    }).then(response => response.data.access_token);
};

const profile = async (token: string) => {
    return axios.get<IUser>(BACKEND_URL + 'auth/profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const AuthService = {
    register,
    login,
    profile
}
