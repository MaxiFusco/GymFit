import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useRoutines } from "../hooks/useData";

export default function Routines() {
  const navigate = useNavigate();
  const { data: routines, isLoading, error } = useRoutines();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <BackButton label="VOLVER" to="/" />

      {/* Main Logo */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-6xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Routines List */}
      <div className="w-full max-w-sm space-y-4">
        {isLoading && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error al cargar rutinas: {error}
          </div>
        )}

        {routines &&
          routines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => navigate(`/routine/${routine.id}`)}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            >
              <h3 className="text-black text-lg font-bold mb-2">
                {routine.title}
              </h3>
              <p className="text-gray-600 text-sm">{routine.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
