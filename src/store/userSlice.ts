import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Settings } from "@/models/models";

const initialState: User = {
    id: "",
    name: "",
    avatarUrl: "",
    settings: { micEnabled: true, theme: "dark", language: "en" },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<User>) => action.payload,
        updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
            state.settings = { ...state.settings, ...action.payload };
        },
    },
});

export const { setUser, updateSettings } = userSlice.actions;
export default userSlice.reducer;