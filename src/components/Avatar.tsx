
import { MicOff } from "lucide-react";

interface AvatarProps {
  name: string;
  src: string;
  size?: "sm" | "md" | "lg";
  muted?: boolean;
}

const sizeClasses = {
  sm: "w-10 h-10 text-base",
  md: "w-16 h-16 text-lg",
  lg: "w-28 h-28 text-xl",
};

export default function Avatar({ name, src, size = "md", muted }: AvatarProps) {
  return (
    <div className={`relative flex flex-col items-center ${sizeClasses[size]}`}>
      <div className="rounded-full overflow-hidden border-2 border-gray-800 shadow-md">
        <img src={src} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/70 rounded text-white text-xs font-medium flex items-center gap-1 shadow">
        {name}
        {muted ? <MicOff size={14} className="text-red-400 ml-1" /> : null}
      </div>
    </div>
  );
}
