import { IDevice } from "@/models";

export interface IDevicesState {
    devices: IDevice[],
    isLoading: boolean;
}

// export interface IDevicesResponse {
//     data: IDevice[]
// }
