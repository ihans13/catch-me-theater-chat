
import { useState } from "react";
import TheaterStage from "@/components/TheaterStage";
import AvatarRows from "@/components/AvatarRows";
import MeetingControls from "@/components/MeetingControls";
import CatchMeChat from "@/components/CatchMeChat";
import { Button } from "@/components/ui/button";
import WebcamCapture from "@/components/WebcamCapture";

const presenter = {
  name: "Jordan Robinson",
  avatarUrl: "https://randomuser.me/api/portraits/men/99.jpg",
};

const audience = [
  { name: "Taylor Smith", avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Sam Park", avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg" },
  { name: "Ava Lee", avatarUrl: "https://randomuser.me/api/portraits/women/85.jpg" },
  { name: "Tony Qian", avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg" },
  { name: "Lisa Chen", avatarUrl: "https://randomuser.me/api/portraits/women/43.jpg" },
  { name: "Noah Kim", avatarUrl: "https://randomuser.me/api/portraits/men/91.jpg" },
  { name: "Ella Tran", avatarUrl: "https://randomuser.me/api/portraits/women/93.jpg" },
  { name: "Mason Diaz", avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
  { name: "Olivia Cruz", avatarUrl: "https://randomuser.me/api/portraits/women/57.jpg" },
  { name: "Liam Patel", avatarUrl: "https://randomuser.me/api/portraits/men/49.jpg" },
  { name: "Mia Kumar", avatarUrl: "https://randomuser.me/api/portraits/women/72.jpg" },
  { name: "Ethan Nguyen", avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg" },
];

export default function Index() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col">
      <header className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center rounded-b-lg shadow">
        <span className="text-md font-medium text-zinc-200 tracking-wide">Theater</span>
      </header>
      <div className="flex flex-1 relative h-full w-full min-h-0 overflow-hidden">
        {/* Meeting/main content shifts when chat is open */}
        <div
          className={`
            flex-1 flex flex-col transition-all duration-300 ease-in-out
            ${chatOpen ? "md:mr-[400px]" : ""}
            min-w-0
          `}
        >
          {/* Stage and audience */}
          <main className="flex flex-col items-center w-full px-2 md:px-8 pt-5 flex-1 min-h-0">
            {/* Big stage area */}
            <section className="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-lg h-72 flex flex-col items-start justify-start mb-6 relative border border-zinc-800">
              <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-800 text-xs rounded-md text-zinc-300">Stage</div>
              <div className="w-full h-full flex flex-col justify-center items-center">
                {/* <span className="text-zinc-500 text-lg font-medium">Waiting for presenters...</span> */}
                <div style={{ width: '400px', height: '100%' }}>
                  <WebcamCapture />
                </div>
              </div>
            </section>
            <div className="flex gap-4 mb-5">
              <Button variant="outline" className="bg-zinc-900 text-zinc-200 border-zinc-700 shadow" onClick={() => alert("Not implemented")}>↑ To Backstage</Button>
              <Button variant="outline" className="bg-zinc-900 text-zinc-200 border-zinc-700 shadow" onClick={() => alert("Not implemented")}>→ Stage</Button>
              <Button variant="outline" className="bg-zinc-900 text-zinc-200 border-zinc-700 shadow" onClick={() => alert("Not implemented")}>🎤 Ask a Question</Button>
            </div>
            <div>
              <AvatarRows audience={audience} />
            </div>
          </main>
          {/* Meeting controls bar */}
          <footer className="left-0 right-0 bottom-0 z-40 flex flex-col items-center pointer-events-none">
            <div className="mb-2 pointer-events-auto w-full max-w-2xl">
              <MeetingControls />
            </div>
          </footer>
        </div>
        {/* Chat sidebar - pushes meeting UI */}
        <CatchMeChat open={chatOpen} onOpenChange={setChatOpen} />
        {/* Floating trigger button: bottom right */}
        {!chatOpen && (
          <button
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-violet-500 text-white p-4 rounded-full shadow-xl flex items-center justify-center border-2 border-indigo-400 hover:scale-105 active:scale-95 transition-all"
            aria-label="Need a recap?"
            onClick={() => setChatOpen(true)}
          >
            <svg width={28} height={28} className="animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 21c1.5-2.75 7.5-2.75 9 0" />
              <circle cx="12" cy="11" r="4" />
              <path d="M12 3v2" />
              <path d="M12 19v2" />
              <path d="M4.22 4.22l1.42 1.42" />
              <path d="M18.36 18.36l1.42 1.42" />
              <path d="M1 12h2" />
              <path d="M21 12h2" />
              <path d="M4.22 19.78l1.42-1.42" />
              <path d="M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
