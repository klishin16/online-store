import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDevicesState } from "@/types/devices.types";
import { addNotification } from "@/redux/features/notifications.slice";
import { DevicesService } from "@/services";
import { errorHandler } from "@/functions/error-handler";

const initialState: IDevicesState = {
    devices: [],
    isLoading: false
}

const fetchDevices = createAsyncThunk(
    "devices/load",
    async (token: string, thunkAPI) => {
        console.log('loadDevices')
        try {
            const devices = await DevicesService.fetchAll(token);
            console.log('devices', devices)
            thunkAPI.dispatch(addNotification({
                title: 'Devices',
                message: 'Devices loaded successfully',
                type: 'success',
            }));
            return devices;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Basket loading error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    })

const createDevice = createAsyncThunk(
    "devices/create",
    async ({ token, payload }: { token: string; payload: any }, thunkAPI) => {
        console.log('createDevice')
        try {
            const devices = await DevicesService.create(token, payload);
            console.log('devices', devices)
            thunkAPI.dispatch(addNotification({
                title: 'Devices',
                message: 'Device created successfully',
                type: 'success',
            }));
            return devices;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Device creation error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    })

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDevices.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                // Devices fetched successfully
                console.log('got', action)
                state.devices = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                // Login failed
                state.isLoading = false;
            })
    }
})

export const devicesReducer = devicesSlice.reducer;
export const devicesActions = {
    fetchDevices,
    createDevice
}
