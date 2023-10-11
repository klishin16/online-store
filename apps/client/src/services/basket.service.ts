import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/constants";
import { RequestBuilder } from "@/functions";
import {
    IBasket,
    IBasketAddDevicePayload,
    IBasketCreationPayload,
    IBasketRemoveDevicePayload,
    IDevice
} from "@/models";
import { EHttpMethods } from "@/hooks";


const fetch = async (token: string, basket_id: number): Promise<IBasket> => {
    return axios.get<IBasket>(BACKEND_URL + 'baskets/' + basket_id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

const create = async (token: string, payload: IBasketCreationPayload) => {
    return axios.post<IBasket>(BACKEND_URL + 'baskets', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

const addDevice = async (token: string, payload: IBasketAddDevicePayload) => {
    return axios.post(BACKEND_URL + 'baskets/add-device', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

const removeDevice = async (token: string, payload: IBasketRemoveDevicePayload) => {
    return axios.post(BACKEND_URL + 'baskets/remove-device', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

export const BasketService = {
    fetch,
    create,
    addDevice,
    removeDevice
}
