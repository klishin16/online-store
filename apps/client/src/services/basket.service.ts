import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/constants";
import { RequestBuilder } from "@/functions";
import { IBasket, IDevice } from "@/models";
import { EHttpMethods } from "@/hooks";

export class BasketService {
    static async getBasket(basketId: number): Promise<AxiosResponse<IBasket>> {
        const rb = new RequestBuilder(BACKEND_URL + `/baskets/${ basketId }`, EHttpMethods.GET)
        // .includeToken(token)

        return axios(rb.build())
    }

    static async createBasket(userId: number): Promise<AxiosResponse<IBasket>> {
        const rb = new RequestBuilder(BACKEND_URL + '/baskets/', EHttpMethods.POST, { userId })

        return axios(rb.build())
    }

    static async addDevice(basketId: number, deviceId: number): Promise<AxiosResponse<IDevice[]>> {
        const rb = new RequestBuilder(
            BACKEND_URL + '/baskets/add-device',
            EHttpMethods.POST,
            { basketId, deviceId })

        return axios(rb.build())
    }

    static async removeDevice(basketId: number, deviceId: number): Promise<AxiosResponse<IDevice[]>> {
        const rb = new RequestBuilder(
            BACKEND_URL + '/baskets/remove-device',
            EHttpMethods.POST,
            { basketId, deviceId })

        return axios(rb.build())
    }
}