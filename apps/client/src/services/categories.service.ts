import axios from "axios";
import { ICategory, ICategoryCreationDto } from "@/models";
import { BACKEND_URL } from "@/constants";

const fetchAll = async (token: string) => {
    return axios.get<ICategory[]>(BACKEND_URL + 'categories', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: ICategoryCreationDto) => {
    return axios.post<ICategory[]>(BACKEND_URL + 'categories',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const CategoriesService = {
    fetchAll,
    create
}
