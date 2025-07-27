import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Main Logo */}
      <div className="text-center mb-20">
        <h1 className="text-white text-6xl md:text-8xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-secondary text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
        >
          Iniciar Sesión
        </button>

        <p className="text-white text-center text-sm">¿No tienes cuenta?</p>

        <button
          onClick={() => navigate("/register")}
          className="w-full bg-secondary text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
