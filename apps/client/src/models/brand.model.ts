import {IDevice} from "./device.model";

export interface IBrand {
    id?: number,
    name: string,
    description: string,
    devices: IDevice[]
}
