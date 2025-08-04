import React from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const ChatbotButton: React.FC<ButtonProps> = ({
  disabled = false,
  onClick,
  className = "",
  Icon,
  text,
  isLoading = false,
  type = "button",
}) => {
  const isCancel = text.toLowerCase() === "cancel";

  const baseStyles =
    "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonColor = isCancel
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${buttonColor} ${className}`}
    >
      {isLoading ? (
        <svg
          className="animate-spin w-4 h-4 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <Icon className="w-4 h-4" />
      )}
      <span>{isLoading ? "Loading..." : text}</span>
    </button>
  );
};

export default ChatbotButton;
