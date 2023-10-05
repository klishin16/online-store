import { IUser } from "@/models";

export interface IAuthState {
    isAuthenticated: boolean;
    token?: string;
    user: IUser | null;
    isLoading: boolean;
}

export interface IRegisterPayload {
    email: string;
    password: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
    redirectTo: string | null;
}

export interface ILoginResponse {
    access_token: string;
}
