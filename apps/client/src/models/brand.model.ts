import {IDevice} from "./device.model";

export interface IBrand {
    id?: number;
    name: string;
    description: string;
    devices: IDevice[];
}

export interface IBrandCreationDto {
    name: string;
    description: string;
}
