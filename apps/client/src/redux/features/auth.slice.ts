import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "@/services";
import { setMessage } from "@/redux/features/message.slice";
import { IAuthState, ILoginPayload, IRegisterPayload } from "@/types";
import { addNotification } from "@/redux/features/notifications.slice";
import { TOKEN_KEY } from "@/constants";
import axios, { AxiosError } from "axios";
import { errorHandler } from "@/functions/error-handler";


export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password }: IRegisterPayload, thunkAPI) => {
        try {
            const response = await AuthService.register(email, password);
            thunkAPI.dispatch(addNotification({
                title: 'Registration',
                message: 'Successfully registered',
                type: 'success',
            }));
            return response.data;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(
                addNotification({
                    title: 'Registration error',
                    message,
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: ILoginPayload, thunkAPI) => {
        try {
            const token = await AuthService.login(email, password);
            thunkAPI.dispatch(addNotification({
                title: 'Login',
                message: 'Logged in successfully',
                type: 'success',
            }));
            return token;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Login error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    }
)

const initialState: IAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                // Login succeeded
                state.token = action.payload;
                localStorage.setItem(TOKEN_KEY, action.payload);
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                // Login failed
                state.isLoading = false;
            })
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                // Login succeeded
                state.token = action.payload;
                localStorage.setItem(TOKEN_KEY, action.payload);
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                // Login failed
                state.isLoading = false;
            });
    }
});

export const authActions = { register };
export default authSlice.reducer;
