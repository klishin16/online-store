import axios from "axios";
import { IDevice } from "@/models";
import { BACKEND_URL } from "@/constants";

const fetchAll = async (token: string) => {
    return axios.get<IDevice[]>(BACKEND_URL + 'devices', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const DevicesService = {
    fetchAll,
}
