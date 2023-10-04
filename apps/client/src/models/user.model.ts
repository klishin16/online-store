import {IRole} from "./role.model";
import {IBasket} from "./basket.model";

export interface IUser {
    id?: number
    email: string;
    password: string;
    basket?: IBasket
    roles: IRole[]
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
    roles: IRole[],
    favoriteDevices: Object[],
    basket?: IBasket
}
