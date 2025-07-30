import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLocalError(null);

  console.log("Datos login enviados:", { email, password }); 
  try {
    await login({ email, password });
    navigate("/");
  } catch (err) {
    setLocalError(error || "Error al iniciar sesión");
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <BackButton label="VOLVER" to="/auth" />

      {/* Main Logo */}
      <div className="text-center mb-12">
        <h1 className="text-white text-5xl md:text-7xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-black text-xl font-semibold mb-6 text-center">
          INICIO DE SESIÓN
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {(localError || error) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {localError || error}
            </div>
          )}

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 pb-2 focus:border-gymfit-red outline-none transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 pb-2 focus:border-gymfit-red outline-none transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gymfit-red text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "INGRESANDO..." : "INGRESAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
