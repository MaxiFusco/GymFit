import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: parseInt(formData.age),
      });
      navigate("/");
    } catch (err) {
      setLocalError(error || "Error al registrarse");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <BackButton label="VOLVER" to="/auth" />

      {/* Main Logo */}
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl md:text-6xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Registration Form */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-black text-lg font-semibold mb-6 text-center">
          COMPLETE SUS DATOS
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(localError || error) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {localError || error}
            </div>
          )}

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border-b border-gray-300 pb-1 focus:border-gymfit-red outline-none transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full border-b border-gray-300 pb-1 focus:border-gymfit-red outline-none transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Nombre:
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border-b border-gray-300 pb-1 focus:border-gymfit-red outline-none transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Edad:
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              className="w-full border-b border-gray-300 pb-1 focus:border-gymfit-red outline-none transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gymfit-red text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "REGISTRANDO..." : "REGISTRARSE"}
          </button>
        </form>
      </div>
    </div>
  );
}
