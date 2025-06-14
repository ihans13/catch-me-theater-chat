/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { X, Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeeting } from "@/hooks/useMeeting";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type ChatState = "idle" | "loading";
type BtnKind   = "simplify" | "reiterate" | "clarify" | "custom";

export default function CatchMeChat({
                                      open,
                                      onOpenChange,
                                    }: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { sendPrompt } = useMeeting();
  const chatLog        = useSelector((s: RootState) => s.meeting?.chatLog) ?? [];

  const [state, setState] = React.useState<ChatState>("idle");
  const [question, setQuestion] = React.useState("");

  const firePrompt = (kind: BtnKind, text?: string) => {
    setState("loading");
    const t0 = Date.now();
    sendPrompt(kind as any, text).finally(() => {
      const wait = Math.max(0, 700 - (Date.now() - t0));
      setTimeout(() => setState("idle"), wait);
    });
  };

  if (!open) return null;

  const btnStyle =
      "flex-1 text-base font-medium rounded-md border-zinc-600 bg-zinc-800 text-zinc-100 transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500/80 hover:to-violet-400/80 hover:border-indigo-400";

  return (
      <aside className="fixed right-0 top-0 bottom-0 h-full bg-zinc-900 border-l border-zinc-800 w-full max-w-[400px] shadow-2xl z-50 flex flex-col"
             style={{ minWidth: 320 }}>
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Sparkles size={32} className="text-indigo-400" />
            <span className="text-xl font-bold text-white">Catch Me Up</span>
          </div>
          <Button size="icon" variant="ghost"
                  className="text-indigo-400 hover:text-red-400 p-2 rounded"
                  onClick={() => onOpenChange(false)} aria-label="Close sidebar">
            <X size={24} />
          </Button>
        </div>

        {/* quick buttons */}
        <div className="px-6 pt-8 flex flex-col gap-2">
          <div className="flex gap-3">
            <Button className={btnStyle} onClick={() => firePrompt("simplify")}>Simplify</Button>
            <Button className={btnStyle} onClick={() => firePrompt("reiterate")}>Reiterate</Button>
            <Button className={btnStyle} onClick={() => firePrompt("clarify")}>Clarify</Button>
          </div>
        </div>

        {/* chat messages */}
        <div className="flex-1 px-6 pt-6 overflow-y-auto flex flex-col gap-3">
          {chatLog.map((m, i) => (
              <div key={i}
                   className={`
              max-w-[70%] px-4 py-2 text-sm rounded-[2rem]
              ${m.role === "user"
                       ? "self-start bg-gradient-to-br from-indigo-600/80 to-purple-600/80 border border-indigo-400/60 text-white"
                       : "self-end bg-zinc-800 border border-zinc-700 text-zinc-200"}
            `}>
                {m.content}
              </div>
          ))}

          {state === "loading" && (
              <div className="self-end flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-2xl p-3 text-sm text-zinc-300 shadow-md">
                <Loader2 className="animate-spin" size={18} />
                <span>Loading…</span>
              </div>
          )}
        </div>

        {/* custom input */}
        <form
            onSubmit={e => {
              e.preventDefault();
              const q = question.trim();
              if (q) { firePrompt("custom", q); setQuestion(""); }
            }}
            className="flex items-center gap-2 px-6 py-4 border-t border-zinc-800 bg-zinc-900"
        >
          <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 rounded-l-md bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-400 outline-none border border-zinc-800 border-r-0 text-sm"
          />
          <button
              type="submit"
              disabled={!question.trim() || state === "loading"}
              className="rounded-r-md px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition h-10 flex items-center justify-center"
          >
            <Send size={22} className="text-indigo-200" />
          </button>
        </form>
      </aside>
  );
}