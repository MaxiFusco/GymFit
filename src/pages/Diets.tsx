import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useDiets } from "../hooks/useData";
import { useAuth } from "../hooks/useAuth"; 


export default function Diets() {
  const navigate = useNavigate();
  const { data: diets, isLoading, error } = useDiets();
  const { user } = useAuth();


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <BackButton label="VOLVER" to="/" />

      {/* Main Logo */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-6xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Diets List */}
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
            Error al cargar dietas: {error}
          </div>
        )}

  {diets &&
  diets.map((diet) => (
    <div
      key={diet.id}
      className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div onClick={() => navigate(`/diet/${diet.id}`)}>
        <h3 className="text-black text-lg font-bold mb-2">{diet.title}</h3>
        <p className="text-gray-600 text-sm">{diet.description}</p>
      </div>

      {user?.role === "ADMIN" && (
        <button
          onClick={() => navigate(`/diet/edit/${diet.id}`)}
          className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Editar
        </button>
      )}
    </div>
  ))}

      </div>
    </div>
  );
}
