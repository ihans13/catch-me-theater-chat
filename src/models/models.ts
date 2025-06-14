/* Pure domain types & a tiny LRU cache – no React / Redux imports   */

export interface Settings {
    micEnabled: boolean;
    theme: "light" | "dark";
    language: string;
}

export interface User {
    id: string;
    name: string;
    avatarUrl: string;
    settings: Settings;
}

/* ---------- live transcript ---------- */

export interface TranscriptChunk {
    /** unix ms timestamp of first token in this chunk */
    ts: number;
    text: string;
}

/**
 * Keeps only the last `max` chunks (≈ snapshots every 30 s for 1 h).
 * Sorting is by `ts`; older chunks drop first.
 */
export class TranscriptCache {
    private readonly max: number;
    private store = new Map<number, TranscriptChunk>();

    constructor(max = 120) {
        this.max = max;
    }

    add(chunk: TranscriptChunk) {
        this.store.set(chunk.ts, chunk);
        if (this.store.size > this.max) {
            const firstKey = this.store.keys().next().value;
            this.store.delete(firstKey);
        }
    }

    getAll(): TranscriptChunk[] {
        return [...this.store.values()].sort((a, b) => a.ts - b.ts);
    }
}

/* ------------ prompt / response ------------- */

export type PromptKind = "simplify" | "reiterate" | "clarify" | "custom";

export interface PromptRequest {
    id: string;
    created: number; // unix ms
    type: PromptKind;
    userInput?: string;
}

export interface PromptResponse {
    requestId: string;
    received: number;
    text: string;
    error?: string;
}

/* -------------- meeting session -------------- */

export interface MeetingSession {
    id: string;
    started: number;

    /* rolling transcript cache (unchanged) */
    transcript: TranscriptCache;

    /* simple lookup of button requests → responses */
    promptHistory: Record<string, PromptResponse>;

    /* ⬅️ NEW: full back-and-forth chat with the assistant */
    chatLog: ChatMessage[];
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    role: ChatRole;
    content: string;
}