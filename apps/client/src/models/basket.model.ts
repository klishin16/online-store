import {IDevice} from "./device.model";


export interface IPurchase {
    id: number;
    deviceId: number;
    device: IDevice;
    amount: number;
}

export interface IBasket {
    id: number;
    userId: number;
    purchases: IPurchase[];
    createdAt: string;
    updatedAt: string;
}

export interface IBasketCreationPayload {
    userId: number;
}

export interface IBasketAddDevicePayload {
    deviceId: number;
    basketId: number;
    amount: number;
}

export interface IBasketRemoveDevicePayload {
    basketId: number;
    purchaseId: number;
}
