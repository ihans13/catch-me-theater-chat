import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// temp for testing
export function playCombinedAudio(blobs: Blob[], mimeType = 'audio/webm') {
  if (!blobs.length) return;

  const combinedBlob = new Blob(blobs, { type: mimeType });
  const url = URL.createObjectURL(combinedBlob);

  const audio = new Audio(url);
  audio.play();

  audio.onended = () => {
    URL.revokeObjectURL(url); // Clean up memory
  };
}