import { useDispatch, useSelector } from "react-redux";
import {
    addTranscriptChunk,
    addPromptRequest,
    addPromptResponse,
} from "@/store/meetingSlice";
import type {
    PromptKind,
    PromptRequest,
    TranscriptChunk,
} from "@/models/models";
import type { RootState, AppDispatch } from "@/store";

const OLLAMA_URL = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "llama3.2"; // <- change to the chat model you pulled

export function useMeeting() {
    const dispatch = useDispatch<AppDispatch>();
    const session  = useSelector((s: RootState) => s.meeting);

    /* ---------- transcript helpers ---------- */

    const pushTranscript = (chunk: TranscriptChunk) =>
        dispatch(addTranscriptChunk(chunk));

    /* ---------- prompt → Ollama  ------------ */

    const sendPrompt = (kind: PromptKind, userInput?: string) => {
        if (!session) return;

        /* craft request object & keep in Redux */
        const req: PromptRequest = {
            id: crypto.randomUUID(),
            created: Date.now(),
            type: kind,
            userInput,
        };
        dispatch(addPromptRequest(req));

        /* craft prompt text that goes to Ollama */
        const system = "You are a helpful meeting assistant.";
        const content =
            kind === "custom"
                ? userInput ?? ""
                : `${kind} the last minute of transcript:\n${session.transcript
                    .getAll()
                    .map(c => c.text)
                    .join(" ")}`;

        /* call Ollama */
        fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                stream: false,
                messages: [
                    { role: "system", content: system },
                    { role: "user",   content },
                ],
            }),
        })
            .then(r => r.json())
            .then(json => {
                console.log("🦙 Ollama replied:", json.message?.content);
                dispatch(
                    addPromptResponse({
                        requestId: req.id,
                        received: Date.now(),
                        text: json.message?.content ?? "",
                    }),
                );
            })
            .catch(err =>
                dispatch(
                    addPromptResponse({
                        requestId: req.id,
                        received: Date.now(),
                        text: "",
                        error: err.message,
                    }),
                ),
            );
    };

    return { session, pushTranscript, sendPrompt };
}