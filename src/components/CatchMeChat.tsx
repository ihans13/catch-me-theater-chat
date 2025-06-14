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
  const [question, setQuestion] = React.useState("");
  const [customQuestions, setCustomQuestions] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Called when user requests a recap (entry into sidebar)
  const handleRecap = async () => {
    setState("idle");
  };

  // For "Simplify", "Reiterate", "Elaborate"
  const askAI = (type: "simplify" | "reiterate" | "elaborate") => {
    setState("idle");
  };

  // 'I'm wondering about...' button behavior
  const handleWonderingClick = () => {
    setQuestion("I'm wondering about");
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 120);
  };

  // Chat input submission - stores message and clears input
  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setCustomQuestions(prev => [...prev, question.trim()]);
    setQuestion("");
  };

  React.useEffect(() => {
    if (open) {
      handleRecap();
    }
    // eslint-disable-next-line
  }, [open]);

  if (!open) return null;

  // Consistent button style for all action buttons
  // text-base font-medium, no color overrides, bg/bg hover handled as before
  const consistentButton =
    "flex-1 text-base font-medium rounded-md border-zinc-600 bg-zinc-800 text-zinc-100 transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500/80 hover:to-violet-400/80 hover:border-indigo-400";

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
      <div className="flex-auto px-6 pb-4 overflow-y-auto min-h-16 flex flex-col justify-start">
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => askAI("simplify")}
              className={consistentButton}
            >
              Simplify
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => askAI("reiterate")}
              className={consistentButton}
            >
              Reiterate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => askAI("elaborate")}
              className={consistentButton}
            >
              Elaborate
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={consistentButton + " mt-1"}
            onClick={handleWonderingClick}
          >
            I&apos;m wondering about...
          </Button>
        </div>
        {/* User's custom questions appear here */}
        {customQuestions.length > 0 && (
          <div className="mt-8 flex flex-col gap-3">
            {customQuestions.map((q, idx) => (
              <div
                key={idx}
                className="rounded bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-100 px-4 py-2 border border-indigo-400/30 text-sm"
              >
                {q}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat input bar pinned to bottom, always visible */}
      <form
        className="flex flex-row items-center gap-2 px-6 py-4 border-t border-zinc-800 bg-zinc-900"
        onSubmit={handleCustomQuestion}
        style={{ boxShadow: "0 -2px 16px 2px rgba(80,55,180,0.10)" }}
      >
        <input
          ref={inputRef}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your question…"
          className="flex-1 rounded-l-md bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-400 outline-none border border-zinc-800 border-r-0 focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button
          type="submit"
          disabled={!question.trim()}
          className="rounded-r-md px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition h-10"
          aria-label="Send"
          style={{
            boxShadow: "0 2px 8px 1px rgba(99,102,241,0.16)", // lavender shadow
          }}
        >
          Send
        </button>
      </form>
    </aside>
  );
}
