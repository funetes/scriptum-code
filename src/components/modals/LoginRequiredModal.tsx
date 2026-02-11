import { useEffect } from "react";
import { LogIn, X } from "lucide-react";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  title?: string;
  description?: string;
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  title = "",
  description = "로그인 후 이용해주세요.",
}: LoginRequiredModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-6">
            <LogIn size={32} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex w-full gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={() => {
                onLogin();
                onClose();
              }}
              className="flex-1 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
