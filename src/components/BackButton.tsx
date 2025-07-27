import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  to?: string;
  className?: string;
}

export function BackButton({
  label = "VOLVER",
  to,
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-4 left-4 z-10 bg-gymfit-red text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors shadow-lg ${className}`}
    >
      {label}
    </button>
  );
}
