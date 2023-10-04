import {IDevice} from "./device.model";

export interface IBasket {
    id?: number;
    userId: number;
    devices: IDevice[];
    createdAt: string;
    updatedAt: string;
}
