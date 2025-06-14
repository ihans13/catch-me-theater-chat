
import * as React from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Chat states: 'idle' | 'loading' | 'summary' | 'error'
type ChatState = "idle" | "loading" | "summary" | "error";

const demoSummary =
  "In the last minute, Jordan spoke about implementing immersive theater layouts, how users interact with the chat feature, and detailed requirements for the ‘Catch Me’ experience.";

interface CatchMeChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CatchMeChat({ open, onOpenChange }: CatchMeChatProps) {
  const [state, setState] = React.useState<ChatState>("idle");
  const [summary, setSummary] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Called when user requests a recap
  const handleRecap = async () => {
    setState("loading");
    setTimeout(() => {
      setSummary(demoSummary);
      setState("summary");
    }, 1200);
  };

  // For "Simplify", "Reiterate", "Explain further"
  const askAI = (type: "simplify" | "reiterate" | "clarify") => {
    setState("loading");
    setTimeout(() => {
      let txt = "";
      if (type === "simplify") txt = "Here's a simpler version: The last minute covered how the host explained the key UI features and how the recap button works.";
      if (type === "reiterate") txt = "Certainly! Jordan reviewed the main interface layout, the private chat bubble for recaps, and audience privacy.";
      if (type === "clarify") txt = "Clarification: The presenter discussed the process and user experience for catching up on missed content in the theater room.";
      setSummary(txt);
      setState("summary");
    }, 1000);
  };

  // Custom question submit
  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setSummary("");
    setTimeout(() => {
      setSummary(
        "Here's a detailed answer to your question: We'll make sure the recap is context-aware and easy to follow!"
      );
      setState("summary");
    }, 1400);
    setQuestion("");
  };

  React.useEffect(() => {
    if (open && state === "idle") {
      handleRecap();
    }
    if (open && state === "summary" && inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line
  }, [open]);

  if (!open) return null;

  return (
    <aside
      className={`
        fixed right-0 top-0 bottom-0 h-full bg-zinc-900 border-l border-zinc-800 w-full max-w-[400px] shadow-2xl z-50 flex flex-col animate-slide-in-right
        transition-transform duration-300
      `}
      style={{
        minWidth: "320px",
      }}
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-6 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Sparkles size={32} className="text-indigo-400" />
          <span className="text-xl font-bold text-white">Catch Me Up</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-indigo-400 hover:text-red-400 transition-colors p-2 rounded"
          aria-label="Close sidebar"
          onClick={() => {
            onOpenChange(false);
            setState("idle");
          }}
        >
          <X size={24} />
        </Button>
      </div>
      {/* Body */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto min-h-16 flex flex-col justify-start">
        {state === "loading" && (
          <div className="text-indigo-300 mt-6">Generating a recap...</div>
        )}
        {state === "summary" && (
          <span className="text-zinc-100 animate-fade-in mt-6">{summary}</span>
        )}
        {state === "error" && (
          <span className="text-red-300">
            Sorry, couldn’t hear that—try again in a few seconds.
          </span>
        )}
        {state === "idle" && (
          <span className="text-zinc-400 italic mt-6">
            You’ll see summaries and AI catch-ups here.
          </span>
        )}
        {(state === "summary" || state === "error") && (
          <div className="flex flex-col gap-2 mt-8">
            <div className="flex gap-1">
              <Button variant="outline" size="sm"
                onClick={() => askAI("simplify")}
                className="text-xs flex-1 border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
              >
                Simplify
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => askAI("reiterate")}
                className="text-xs flex-1 border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
              >
                Reiterate
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => askAI("clarify")}
                className="text-xs flex-1 border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
              >
                Clarify
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Input Area */}
      <form
        className="border-t border-zinc-800 px-4 py-3 bg-zinc-950 flex"
        onSubmit={handleCustomQuestion}
      >
        <input
          ref={inputRef}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={state === "loading"}
          placeholder="Ask for a summary, next steps…"
          className="flex-1 rounded-l-md bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-400 outline-none border border-zinc-800 border-r-0 focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button
          type="submit"
          disabled={!question.trim() || state === "loading"}
          className="rounded-r-md px-5 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          aria-label="Send"
        >
          Send
        </button>
      </form>
    </aside>
  );
}
