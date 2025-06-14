
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

  // Called when user requests a recap (entry into sidebar)
  const handleRecap = async () => {
    setState("loading");
    setSummary("");
    setTimeout(() => {
      setSummary(demoSummary);
      setState("summary");
    }, 1200);
  };

  // For "Simplify", "Reiterate", "Elaborate"
  const askAI = (type: "simplify" | "reiterate" | "elaborate") => {
    setState("loading");
    setTimeout(() => {
      let txt = "";
      if (type === "simplify")
        txt =
          "Here's a simpler version: The last minute covered how the host explained the key UI features and how the recap button works.";
      if (type === "reiterate")
        txt =
          "Certainly! Jordan reviewed the main interface layout, the private chat bubble for recaps, and audience privacy.";
      if (type === "elaborate")
        txt =
          "Here's a more detailed explanation: The presenter broke down the user interface for immersive theater, highlighting catch-up features and the recap flow in granular steps.";
      setSummary(txt);
      setState("summary");
    }, 1000);
  };

  // 'I'm wondering about...' button behavior
  const handleWonderingClick = () => {
    setQuestion("I'm wondering about");
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 120);
  };

  // Chat input submission
  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
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
    // eslint-disable-next-line
  }, [open]);

  if (!open) return null;

  // Custom lavender gradient hover overlay for buttons
  const lavenderGradient =
    "hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500/80 hover:to-violet-400/80 hover:border-indigo-400 transition-all duration-200";
  const buttonBase =
    "text-xs flex-1 border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 relative";

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
        {(state === "summary" || state === "idle" || state === "error") && (
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex gap-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => askAI("simplify")}
                className={`${buttonBase} ${lavenderGradient}`}
              >
                Simplify
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => askAI("reiterate")}
                className={`${buttonBase} ${lavenderGradient}`}
              >
                Reiterate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => askAI("elaborate")}
                className={`${buttonBase} ${lavenderGradient}`}
              >
                Elaborate
              </Button>
            </div>
            <Button
              variant="outline"
              size="default"
              className="mt-2 border-zinc-600 bg-zinc-800 text-zinc-100 text-sm font-semibold py-2 italic transition-all hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500/80 hover:to-violet-400/80 hover:border-indigo-400"
              onClick={handleWonderingClick}
            >
              I&apos;m wondering about...
            </Button>
          </div>
        )}

        {/* Loading state */}
        {state === "loading" && (
          <div className="text-indigo-300 mt-6">Generating a recap...</div>
        )}

        {/* Show summary only after a button is clicked and summary state is set */}
        {state === "summary" && summary && (
          <span className="text-zinc-100 animate-fade-in mt-8">{summary}</span>
        )}
        {state === "error" && (
          <span className="text-red-300 mt-8">
            Sorry, couldn’t hear that—try again in a few seconds.
          </span>
        )}
      </div>

      {/* Chat input bar pinned to bottom, always visible except when loading */}
      {state !== "loading" && (
        <form
          className="flex flex-row items-center gap-2 px-6 py-4 border-t border-zinc-800 bg-zinc-900"
          onSubmit={handleCustomQuestion}
          style={{ boxShadow: "0 -2px 16px 2px rgba(80,55,180,0.10)" }}
        >
          <input
            ref={inputRef}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={state === "loading"}
            placeholder="Type your question…"
            className="flex-1 rounded-l-md bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-400 outline-none border border-zinc-800 border-r-0 focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <button
            type="submit"
            disabled={!question.trim() || state === "loading"}
            className="rounded-r-md px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition h-10"
            aria-label="Send"
            style={{
              boxShadow: "0 2px 8px 1px rgba(99,102,241,0.16)", // lavender shadow
            }}
          >
            Send
          </button>
        </form>
      )}
    </aside>
  );
}
