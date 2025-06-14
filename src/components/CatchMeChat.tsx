
import * as React from "react";
import { Loader2, Sparkles, MessageSquare, CornerDownLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from "@/components/ui/drawer";

// Chat states: 'idle' | 'loading' | 'summary' | 'error'
type ChatState = "idle" | "loading" | "summary" | "error";

const demoSummary =
  "In the last minute, Jordan spoke about implementing immersive theater layouts, how users interact with the chat feature, and detailed requirements for the ‘Catch Me’ experience.";

export default function CatchMeChat() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<ChatState>("idle");
  const [summary, setSummary] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

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
  const handleDrawerClose = () => {
    setOpen(false);
    setTimeout(() => {
      setState("idle");
      setSummary("");
    }, 200); // matches CSS transition
  };

  // Focus input when opened and ready for question
  React.useEffect(() => {
    if (open && state === "summary" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, state]);

  return (
    <>
      {/* Bottom right icon to open recap drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            onClick={handleRecap}
            className="
              fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-violet-500
              text-white p-4 rounded-full shadow-xl flex items-center justify-center
              border-2 border-indigo-400
              hover:scale-105 active:scale-95 transition-all duration-200
              z-50 cursor-pointer
            "
            aria-label="Need a recap?"
          >
            <Sparkles size={28} className="animate-pulse" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-[420px] w-full">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-lg">
                <MessageSquare className="text-indigo-400" size={22} />
                CatchMe Recap
              </div>
              <DrawerClose asChild>
                <button
                  aria-label="Close"
                  className="text-indigo-300 hover:text-red-400 p-1 rounded transition"
                  onClick={handleDrawerClose}
                  type="button"
                >
                  <X size={22} />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

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
                  ref={inputRef}
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
