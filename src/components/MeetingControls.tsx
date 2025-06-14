
import { useState } from "react";
import { Mic, Video, Upload, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeetingControls() {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <div className="w-full flex justify-center gap-3 bg-zinc-950 py-2 px-3 rounded-t-lg shadow-2xl border-t border-zinc-800">
      <Button
        variant={micOn ? "default" : "outline"}
        onClick={() => setMicOn((v) => !v)}
        className="flex flex-col items-center px-4 py-2"
      >
        <Mic className={micOn ? "text-green-400" : "text-zinc-300"} />
        <span className="text-xs mt-1">Mic</span>
      </Button>
      <Button
        variant={videoOn ? "default" : "outline"}
        onClick={() => setVideoOn((v) => !v)}
        className="flex flex-col items-center px-4 py-2"
      >
        <Video className={videoOn ? "text-green-400" : "text-zinc-300"} />
        <span className="text-xs mt-1">Video</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => alert("Upload feature coming soon!")}
        className="flex flex-col items-center px-4 py-2"
      >
        <Upload className="text-zinc-300" />
        <span className="text-xs mt-1">Upload</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => alert("Reactions coming soon!")}
        className="flex flex-col items-center px-4 py-2"
      >
        <Smile className="text-zinc-300" />
        <span className="text-xs mt-1">React</span>
      </Button>
    </div>
  );
}
