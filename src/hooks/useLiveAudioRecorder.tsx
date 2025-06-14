import { useRef } from "react";
import { useMeeting } from "@/hooks/useMeeting";
import type { TranscriptChunk } from "@/models/models";

/**
 * Captures mic audio, converts it to text via Ollama Whisper,
 * and every 30 s pushes a snapshot chunk into Redux.
 */
export function useLiveAudioRecorder() {
    const { pushTranscript } = useMeeting();

    const recorderRef = useRef<MediaRecorder | null>(null);
    const streamRef   = useRef<MediaStream>();
    const textBufRef  = useRef<string>("");           // accumulates 30-s text
    const timerRef    = useRef<number | null>(null);

    /* ---------- helpers ---------- */
    const flush = () => {
        const text = textBufRef.current.trim();
        if (!text) return;
        const chunk: TranscriptChunk = { ts: Date.now(), text };
        pushTranscript(chunk);
        console.log("[Whisper] snapshot →", text.slice(0, 70), "…");
        textBufRef.current = "";
    };

    const sendToWhisper = async (blob: Blob) => {
        const fd = new FormData();
        fd.append("audio", blob, "chunk.webm");

        const r   = await fetch("http://localhost:3333/stt", { method: "POST", body: fd });
        const res = (await r.json()) as { response: string };
        const text = (res.response ?? "").trim();
        if (text) textBufRef.current += " " + text;
    };

    /* ---------- controls ---------- */
    const startRec = async () => {
        if (recorderRef.current) return;               // already running
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

        recorderRef.current = new MediaRecorder(streamRef.current, { mimeType: "audio/webm" });
        recorderRef.current.ondataavailable = e => {
            if (e.data.size) sendToWhisper(e.data);
        };
        recorderRef.current.start(1000);               // 1-s chunks

        timerRef.current = window.setInterval(flush, 30_000);
        console.log("[rec] started");
    };

    const stopRec = () => {
        flush();                                       // push final chunk
        recorderRef.current?.stop();
        streamRef.current?.getTracks().forEach(t => t.stop());
        if (timerRef.current) clearInterval(timerRef.current);

        recorderRef.current = null;
        timerRef.current    = null;
        console.log("[rec] stopped");
    };

    return { startRec, stopRec };
}