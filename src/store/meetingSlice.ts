import {
    MeetingSession,
    TranscriptChunk,
    TranscriptCache,
    PromptRequest,
    PromptResponse,
} from "@/models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = MeetingSession | null;

const initialState: State = null;

const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {
        createSession: (_state, action: PayloadAction<string>) => ({
            id: action.payload,
            started: Date.now(),
            transcript: new TranscriptCache(),
            promptHistory: {},
        }),

        endSession: () => null,

        addTranscriptChunk: (state, action: PayloadAction<TranscriptChunk>) => {
            state?.transcript.add(action.payload);
        },

        addPromptRequest: (state, action: PayloadAction<PromptRequest>) => {
            /*  fire side-effects elsewhere (RTK Query / thunk)  */
        },

        addPromptResponse: (state, action: PayloadAction<PromptResponse>) => {
            if (state)
                state.promptHistory[action.payload.requestId] = action.payload;
        },
    },
});

export const {
    createSession,
    endSession,
    addTranscriptChunk,
    addPromptRequest,
    addPromptResponse,
} = meetingSlice.actions;

export default meetingSlice.reducer;