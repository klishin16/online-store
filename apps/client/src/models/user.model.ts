import {IBasket} from "./basket.model";


export enum EUserRoles {
    USER = 'user',
    EDITOR = 'editor',
    ADMIN = 'admin',
}

export interface IUser {
    id: number
    email: string;
    password: string;
    basket?: IBasket
    role: EUserRoles
//    TODO определиться с полями (см ниже)
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
    user: IUser;
}

export interface IUserFull {
    id?: number,
    email: string,
    password: string,
    banned: boolean,
    banReason: string,
    role: EUserRoles,
    favoriteDevices: Object[],
    basket?: IBasket
}

export interface IUserCreationDto {
    email: string;
    password: string;
    role: EUserRoles;
}
