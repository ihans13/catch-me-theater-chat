
import { VideoIcon, MicOff } from "lucide-react";

interface Presenter {
  name: string;
  avatarUrl: string;
}

export default function TheaterStage({ presenter }: { presenter: Presenter }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="mb-2 flex items-center gap-3">
        <span className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full px-4 py-1 text-xs font-semibold tracking-wide shadow-lg animate-[pulse_2s_infinite] border border-indigo-400">
          Stage
        </span>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48 rounded-2xl border-4 border-indigo-400 shadow-[0_0_48px_4px_rgba(94,30,234,0.4)] bg-[#12111a] flex items-center justify-center">
          {/* Replace with real video element */}
          <img
            src={presenter.avatarUrl}
            alt={presenter.name}
            className="w-44 h-44 object-cover rounded-xl"
          />
          <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded-lg flex items-center gap-1">
            <span className="text-sm font-bold text-white">{presenter.name}</span>
            <MicOff size={16} className="text-red-400" title="Everyone else muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
