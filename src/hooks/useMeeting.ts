import { useDispatch, useSelector } from "react-redux";
import {
    addTranscriptChunk,
    addPromptRequest,
    addPromptResponse,
    appendChat,
} from "@/store/meetingSlice";
import type {
    PromptKind,
    PromptRequest,
    TranscriptChunk,
    ChatMessage,
} from "@/models/models";
import type { RootState, AppDispatch } from "@/store";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

const templates: Record<Exclude<PromptKind, "custom">, string> = {
    simplify : "Rewrite the following in simpler language:",
    reiterate: "Give me a concise recap of this:",
    clarify  : "Explain this in more detail:",
};

export function useMeeting() {
    const dispatch = useDispatch<AppDispatch>();
    const session  = useSelector((s: RootState) => s.meeting);

    const pushTranscript = (c: TranscriptChunk) => dispatch(addTranscriptChunk(c));

    /**
     * Send a prompt; resolves when the assistant message has been stored.
     */
    const sendPrompt = (kind: PromptKind, userInput?: string): Promise<void> => {
        if (!session) return Promise.reject("no-session");

        /* first message gets last 1-min transcript, later ones just chatLog */
        const ctx = session.transcript.getAll().slice(-2).map(c => c.text).join(" ");

        const userContent =
            kind === "custom" ? (userInput ?? "") : `${templates[kind]}\n\n${ctx}`;

        const userMsg: ChatMessage = { role: "user", content: userContent };
        dispatch(appendChat(userMsg));

        /* build full context: system + chatLog (now incl. userMsg) */
        const messages = [
            { role: "system", content: "You are a helpful meeting assistant." },
            ...session.chatLog,
            userMsg,
        ];

        const req: PromptRequest = {
            id: crypto.randomUUID(),
            created: Date.now(),
            type: kind,
            userInput,
        };
        dispatch(addPromptRequest(req));

        return fetch(OPENAI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_KEY}`,
            },
            body: JSON.stringify({ model: "gpt-3.5-turbo", messages }),
        })
            .then(async r => {
                const json  = await r.json();
                const reply = json.choices?.[0]?.message?.content ?? "";
                const aiMsg: ChatMessage = { role: "assistant", content: reply };
                dispatch(appendChat(aiMsg));

                dispatch(
                    addPromptResponse({
                        requestId: req.id,
                        received: Date.now(),
                        text: reply,
                        error: r.ok ? undefined : "HTTP " + r.status,
                    }),
                );
            })
            .catch(err => {
                dispatch(
                    addPromptResponse({
                        requestId: req.id,
                        received: Date.now(),
                        text: "",
                        error: err.message,
                    }),
                );
            });
    };

    return { session, pushTranscript, sendPrompt };
}