// src/store/index.ts
import { configureStore, isPlain } from "@reduxjs/toolkit";
import userReducer    from "./userSlice";
import meetingReducer from "./meetingSlice";
import { TranscriptCache } from "@/models/models";

export const store = configureStore({
    reducer: { user: userReducer, meeting: meetingReducer },

    middleware: getDefault => getDefault({
        serializableCheck: {
            ignoredPaths: ["meeting.transcript"],      // skip that branch
            isSerializable: (v: any) =>
                isPlain(v) || v instanceof TranscriptCache || v instanceof Map,
        },
    }),
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;