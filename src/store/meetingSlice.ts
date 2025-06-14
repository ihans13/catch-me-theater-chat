import {
    MeetingSession,
    TranscriptChunk,
    TranscriptCache,
    PromptRequest,
    PromptResponse,
    ChatMessage,
} from "@/models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* 10-second dummy text so the first button has material */
const seed: TranscriptChunk = {
    ts: Date.now(),
    text:
        "Welcome! In the last ten seconds the host introduced the immersive " +
        "layout and showed how the recap sidebar helps late joiners catch up.",
};

const makeSession = (id = "initial"): MeetingSession => {
    const cache = new TranscriptCache();
    cache.add(seed);
    return {
        id,
        started: Date.now(),
        transcript: cache,
        promptHistory: {},
        chatLog: [],
    };
};

type State = MeetingSession | null;
const initialState: State = makeSession();

const meetingSlice = createSlice({
    name: "meeting",
    initialState,

    reducers: {
        createSession: (_s, a: PayloadAction<string>) => makeSession(a.payload),
        endSession: () => null,

        addTranscriptChunk: (s, a: PayloadAction<TranscriptChunk>) => {
            s?.transcript.add(a.payload);
        },

        addPromptRequest: (_s, _a: PayloadAction<PromptRequest>) => {},

        addPromptResponse: (s, a: PayloadAction<PromptResponse>) => {
            if (s) s.promptHistory[a.payload.requestId] = a.payload;
        },

        appendChat: (s, a: PayloadAction<ChatMessage>) => {
            s?.chatLog.push(a.payload);
        },
    },
});

export const {
    createSession,
    endSession,
    addTranscriptChunk,
    addPromptRequest,
    addPromptResponse,
    appendChat,
} = meetingSlice.actions;

export default meetingSlice.reducer;