
import * as React from "react";
import { Loader2, Sparkles, MessageSquare, CornerDownLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Chat states: 'idle' | 'loading' | 'summary' | 'error'
type ChatState = "idle" | "loading" | "summary" | "error";

const demoSummary =
  "In the last minute, Jordan spoke about implementing immersive theater layouts, how users interact with the chat feature, and detailed requirements for the ‘Catch Me’ experience.";

export default function CatchMeChat() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<ChatState>("idle");
  const [summary, setSummary] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const chatRef = React.useRef<HTMLDivElement>(null);

  // Called when user requests a recap
  const handleRecap = async () => {
    setState("loading");
    setOpen(true);
    setTimeout(() => {
      setSummary(demoSummary);
      setState("summary");
    }, 1200); // Simulate a fast async response
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

  // Close/collapse with fade-out animation
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setState("idle");
      setSummary("");
    }, 200); // matches CSS transition
  };

  // Focus input when opened
  React.useEffect(() => {
    if (open && state === "summary" && chatRef.current) {
      chatRef.current.focus();
    }
  }, [open, state]);

  return (
    <>
      {/* Collapsed Recap Bubble */}
      {!open && (
        <button
          type="button"
          onClick={handleRecap}
          className="
            fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-500
            text-white px-7 py-3 rounded-full shadow-xl flex items-center
            font-semibold text-base border-2 border-indigo-400
            hover:scale-105 active:scale-95 transition-all duration-200
            z-40 animate-fade-in cursor-pointer
          "
        >
          <Sparkles className="mr-2 animate-pulse" size={22} />
          Need a recap?
        </button>
      )}

      {/* Expanded Recap Chat */}
      <div
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[360px] max-w-full pointer-events-none",
          open ? "animate-fade-in pointer-events-auto" : "invisible pointer-events-none"
        )}
      >
        <div
          className={cn(
            "bg-[#151525] border border-indigo-700 rounded-2xl shadow-2xl flex flex-col items-stretch gap-0",
            "transition-transform duration-200",
            open ? "scale-100 opacity-100" : "scale-95 opacity-0",
            "min-h-[120px]"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-1">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-lg">
              <MessageSquare className="text-indigo-400" size={20} />
              CatchMe Recap
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="text-indigo-200 hover:text-red-400 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>
          {/* Content area */}
          <div className="px-4 py-3 text-white min-h-[64px] text-base">
            {state === "loading" && (
              <div className="flex items-center gap-2 text-indigo-200">
                <Loader2 className="animate-spin" size={22} />
                Generating a recap...
              </div>
            )}
            {state === "summary" && (
              <span className="animate-fade-in">{summary}</span>
            )}
            {state === "error" && (
              <span className="text-red-300">
                Sorry, couldn’t hear that—try again in a few seconds.
              </span>
            )}
            {state === "idle" && (
              <span className="text-zinc-300">
                (Ask for a recap of what just happened!)
              </span>
            )}
          </div>
          {/* Quick actions & Input */}
          {(state === "summary" || state === "error") && (
            <div className="flex flex-col gap-1 pb-3 px-3">
              <div className="flex gap-1 justify-between">
                <Button variant="outline" size="sm" onClick={() => askAI("simplify")} className="text-xs flex-1 border-zinc-600 bg-zinc-900 hover:bg-zinc-800">
                  Simplify
                </Button>
                <Button variant="outline" size="sm" onClick={() => askAI("reiterate")} className="text-xs flex-1 border-zinc-600 bg-zinc-900 hover:bg-zinc-800">
                  Reiterate
                </Button>
                <Button variant="outline" size="sm" onClick={() => askAI("clarify")} className="text-xs flex-1 border-zinc-600 bg-zinc-900 hover:bg-zinc-800">
                  Clarify
                </Button>
              </div>
              <form className="flex w-full mt-2" onSubmit={handleCustomQuestion}>
                <input
                  ref={chatRef}
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  disabled={state === "loading"}
                  placeholder="Ask anything about the last minute…"
                  className="flex-1 rounded-l-lg bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-400 outline-none border border-zinc-700 border-r-0 focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!question.trim() || state === "loading"}
                  className="rounded-r-lg px-3 bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition"
                  aria-label="Send"
                >
                  <CornerDownLeft size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
