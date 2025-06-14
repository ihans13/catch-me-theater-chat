
import { useState } from "react";
import {
  Video,
  Mic,
  Upload,
  Smile,
  Feather,
  Folder,
  MessageSquare,
  Server,
  Calendar,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeetingControls() {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  // Icon definitions with minimal logic for active/inactive state
  const controls = [
    {
      key: "video",
      icon: <Video className={videoOn ? "text-red-500" : "text-white"} size={28}/>,
      action: () => setVideoOn((v) => !v),
      extra: <ChevronUp size={14} className="ml-1 text-white opacity-60" />,
      active: videoOn,
    },
    {
      key: "mic",
      icon: <Mic className={micOn ? "text-red-500" : "text-white"} size={28} />,
      action: () => setMicOn((v) => !v),
      extra: <ChevronUp size={14} className="ml-1 text-white opacity-60" />,
      active: micOn,
    },
    {
      key: "upload",
      icon: <Upload className="text-white" size={26} />,
      action: () => alert("Upload coming soon!"),
    },
    {
      key: "smile",
      icon: <Smile className="text-white" size={26} />,
      action: () => alert("Reactions coming soon!"),
    },
    {
      key: "feather",
      icon: <Feather className="text-green-400" size={26} />,
      action: () => alert("Feature coming soon!"),
      style: "ml-2",
    },
    {
      key: "folder",
      icon: <Folder className="text-white" size={26} />,
      action: () => alert("Folders coming soon!"),
      style: "ml-8",
    },
    {
      key: "message",
      icon: <MessageSquare className="text-white" size={26} />,
      action: () => alert("Messages coming soon!"),
    },
    {
      key: "server",
      icon: <Server className="text-white" size={26} />,
      action: () => alert("More coming soon!"),
    },
    {
      key: "calendar",
      icon: <Calendar className="text-white" size={26} />,
      action: () => alert("Calendar coming soon!"),
    },
    {
      key: "logout",
      icon: <LogOut className="text-red-500" size={26} />,
      action: () => alert("Goodbye!"),
      style: "ml-7",
    },
  ];

  return (
    <div className="w-full flex justify-center pointer-events-none">
      <nav className="flex items-center pointer-events-auto bg-zinc-900 rounded-2xl py-2 px-5 gap-4 shadow-2xl">
        {controls.map((control) => (
          <button
            key={control.key}
            className={`flex items-center justify-center rounded-lg transition hover:bg-zinc-800 active:bg-zinc-950 duration-100 px-2 py-1
              ${control.active ? "bg-zinc-800" : ""}
              ${control.style ? control.style : ""}
            `}
            aria-label={control.key}
            onClick={e => {
              e.preventDefault();
              control.action();
            }}
            type="button"
            tabIndex={0}
          >
            {control.icon}
            {control.extra && control.extra}
          </button>
        ))}
      </nav>
    </div>
  );
}
