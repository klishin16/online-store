import axios from "axios";
import { IBrand, IBrandCreationDto, IUser, IUserCreationDto } from "@/models";
import { BACKEND_URL } from "@/constants";

const fetchAll = async (token: string) => {
    return axios.get<IUser[]>(BACKEND_URL + 'users', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: IUserCreationDto) => {
    return axios.post<IUser>(BACKEND_URL + 'users',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const UsersService = {
    fetchAll,
    create
}
