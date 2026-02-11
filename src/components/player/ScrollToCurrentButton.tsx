import { RefreshCwIcon } from "lucide-react";

interface ScrollToCurrentButtonProps {
  onClick: () => void;
}

export function ScrollToCurrentButton({ onClick }: ScrollToCurrentButtonProps) {
  return (
    <div
      onClick={onClick}
      className="sticky ml-auto mr-2 flex items-center justify-center bottom-4 w-10 h-10 cursor-pointer bg-blue-200 rounded-full p-1.5 opacity-70"
    >
      <RefreshCwIcon size={24} color="black" opacity={0.7} strokeWidth={1.3} />
    </div>
  );
}
