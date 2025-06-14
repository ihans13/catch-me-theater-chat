import { MicOff } from "lucide-react";

interface Presenter {
  name: string;
  avatarUrl: string;
}

export default function TheaterStage({ presenter }: { presenter: { name: string; avatarUrl: string } }) {
  return (
    <div className="flex flex-col items-center px-6">
      <div className="mb-3 text-center">
        <span className="text-zinc-300 uppercase tracking-widest text-xs font-semibold">On stage</span>
      </div>
      <div className="relative">
        <div className="rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl bg-black w-28 h-28 flex items-center justify-center">
          <img src={presenter.avatarUrl} alt={presenter.name} className="object-cover w-full h-full" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-500 rounded-full text-white text-lg font-bold shadow-lg flex items-center gap-2">
          {presenter.name}
          <MicOff size={18} className="text-red-400 ml-1" />
        </div>
      </div>
    </div>
  );
}
