import axios from "axios";
import { IBrand, IBrandCreationDto } from "@/models";
import { BACKEND_URL } from "@/constants";

const fetchAll = async (token: string) => {
    return axios.get<IBrand[]>(BACKEND_URL + 'brands', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: IBrandCreationDto) => {
    return axios.post<IBrand[]>(BACKEND_URL + 'brands',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const BrandsService = {
    fetchAll,
    create
}
