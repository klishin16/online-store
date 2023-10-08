import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EThemes, ISettingsState } from "@/constants";


const initialState: ISettingsState = {
    theme: EThemes.DARK
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, { payload }: PayloadAction<EThemes>) => {
            return ({
                ...state,
                theme: payload
            })
        }
    }
})

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
