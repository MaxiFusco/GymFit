import { useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton";

export default function RoutineDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <BackButton label="VOLVER" to="/routines" />

      {/* Main Logo */}
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl md:text-6xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Routine Content */}
      <div className="w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Rutina {id}
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-black text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa officia deserunt mollit anim id est laboru
          </p>
        </div>
      </div>
    </div>
  );
}
