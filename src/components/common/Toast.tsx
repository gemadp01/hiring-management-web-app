import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type TToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

export const Toast = ({ message, duration = 5000, onClose }: TToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`border-l-5 border-primary-main z-20 fixed left-6 bottom-6 bg-neutral-10 rounded-lg shadow-lg transition-all duration-300 ${
        isExiting
          ? "opacity-0 translate-y-[-10px]"
          : "opacity-100 translate-y-0"
      }`}
      style={{ minWidth: "320px", maxWidth: "320px" }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <CheckCircleIcon className="w-5 h-5 text-primary-main shrink-0" />
        <span className="text-m-bold text-neutral-90 flex-1">{message}</span>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-5 h-5 text-neutral-90" />
        </button>
      </div>
    </div>
  );
};
