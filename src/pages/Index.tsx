import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <BackButton label="SALIR" to="/auth" className="bg-gymfit-red" />

      {/* Main Logo */}
      <div className="text-center mb-16">
        <h1 className="text-white text-6xl md:text-8xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 font-handwriting">
          ¿Qué te gustaría hacer?
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate("/diets")}
          className="w-full bg-gymfit-red text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
        >
          CONSULTAR DIETA
        </button>

        <button
          onClick={() => navigate("/routines")}
          className="w-full bg-gymfit-red text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
        >
          CONSULTAR RUTINA
        </button>

        <button
          onClick={() => navigate("/products")}
          className="w-full bg-gymfit-red text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
        >
          CONSULTAR PRODUCTO
        </button>
      </div>
    </div>
  );
}
