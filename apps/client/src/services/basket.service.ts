import axios, { AxiosResponse } from "axios";
import { BASE_BACKEND_URL } from "@/constants";
import { RequestBuilder } from "../functions/request-builder";
import { IBasket, IDevice } from "@/models";
import { HttpMethods } from "@/hooks";

export class BasketService {
    static async getBasket(basketId: number): Promise<AxiosResponse<IBasket>> {
        const rb = new RequestBuilder(BASE_BACKEND_URL + `/baskets/${basketId}`, HttpMethods.GET)
        // .includeToken(token)

        return axios(rb.build())
    }

    static async createBasket(userId: number): Promise<AxiosResponse<IBasket>> {
        const rb = new RequestBuilder(BASE_BACKEND_URL + '/baskets/', HttpMethods.POST, {userId})

        return axios(rb.build())
    }

    static async addDevice(basketId: number, deviceId: number): Promise<AxiosResponse<IDevice[]>> {
        const rb = new RequestBuilder(
            BASE_BACKEND_URL + '/baskets/add-device',
            HttpMethods.POST,
            {basketId, deviceId})

        return axios(rb.build())
    }

    static async removeDevice(basketId: number, deviceId: number): Promise<AxiosResponse<IDevice[]>> {
        const rb = new RequestBuilder(
            BASE_BACKEND_URL + '/baskets/remove-device',
            HttpMethods.POST,
            {basketId, deviceId})

        return axios(rb.build())
    }
}