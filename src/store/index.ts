import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import meetingReducer from "./meetingSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        meeting: meetingReducer,
    },
    /*  add middleware / devTools opts here if needed  */
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;