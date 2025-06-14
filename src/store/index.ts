import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import meetingReducer from "./meetingSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        meeting: meetingReducer,
    },
    /*  add middleware / devTools opts here if needed  */
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;