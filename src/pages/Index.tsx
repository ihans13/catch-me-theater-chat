
import TheaterStage from "@/components/TheaterStage";
import AvatarRows from "@/components/AvatarRows";
import MeetingControls from "@/components/MeetingControls";
import CatchMeChat from "@/components/CatchMeChat";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col justify-between">
      {/* Top header bar */}
      <header className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center rounded-b-lg shadow">
        <span className="text-md font-medium text-zinc-200 tracking-wide">Theater</span>
      </header>
      {/* Stage */}
      <main className="flex flex-col items-center w-full px-2 md:px-8 pt-5 flex-1">
        {/* Big stage area */}
        <section className="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-lg h-72 flex flex-col items-start justify-start mb-6 relative border border-zinc-800">
          <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-800 text-xs rounded-md text-zinc-300">Stage</div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <span className="text-zinc-500 text-lg font-medium">Waiting for presenters...</span>
          </div>
        </section>
        {/* Backstage/Stage/Question Controls */}
        <div className="flex gap-4 mb-5">
          <Button variant="outline" className="bg-zinc-900 text-zinc-200 border-zinc-700 shadow" onClick={() => alert("Not implemented")}>↑ To Backstage</Button>
          <Button variant="outline" className="bg-zinc-900 text-zinc-200 border-zinc-700 shadow" onClick={() => alert("Not implemented")}>→ Stage</Button>
          <Button variant="outline" className="bg-zinc-900 text-zinc-200 border-zinc-700 shadow" onClick={() => alert("Not implemented")}>🎤 Ask a Question</Button>
        </div>
        {/* Audience rows */}
        <AvatarRows audience={audience} />
      </main>
      {/* Meeting controls bar */}
      <footer className="fixed left-0 right-0 bottom-0 z-40 flex flex-col items-center pointer-events-none">
        <div className="mb-2 pointer-events-auto w-full max-w-2xl">
          <MeetingControls />
        </div>
      </footer>
      {/* CatchMe Chat component (fixed sidebar trigger) */}
      <CatchMeChat />
    </div>
  );
}
