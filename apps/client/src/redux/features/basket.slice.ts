import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { IBasketState } from "@/types/basket.types";
import { IUser } from "@/models";
import { errorHandler } from "@/functions/error-handler";


const initialState: IBasketState = {
    isLoading: false,
    purchases: null
}

const loadBasket = createAsyncThunk(
    "basket/load",
    async (user: IUser, thunkAPI) => {
        try {
            const basket = user.basket ?
                await BasketService.getBasket(user?.basket?.id!) :
                await BasketService.createBasket(user?.id!)

            thunkAPI.dispatch(addNotification({
                title: 'Basket',
                message: basket.data as unknown as string,
                type: 'success',
            }));
            return basket;
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
    }
)

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {}
})

export const basketReducer = basketSlice.reducer;

export const basketActions = {
    loadBasket
}
