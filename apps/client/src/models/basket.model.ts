import {IDevice} from "./device.model";


export interface IPurchase {
    id: number;
    device: IDevice;
    amount: number;
}

export interface IBasket {
    id?: number;
    userId: number;
    devices: IDevice[];
    createdAt: string;
    updatedAt: string;
}
