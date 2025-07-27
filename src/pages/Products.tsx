import { BackButton } from "../components/BackButton";
import { useProducts, useConsultation } from "../hooks/useData";

export default function Products() {
  const { data: products, isLoading, error } = useProducts();
  const {
    submitConsultation,
    isSubmitting,
    error: consultationError,
  } = useConsultation();

  const handleConsult = async () => {
    try {
      await submitConsultation("products", { products });
      alert("Consulta enviada exitosamente!");
    } catch (err) {
      alert("Error al enviar la consulta");
    }
  };
  return (
    <div className="min-h-screen flex flex-col px-6 relative">
      <BackButton label="VOLVER" to="/" />

      {/* Main Logo */}
      <div className="text-center pt-16 mb-8">
        <h1 className="text-white text-4xl md:text-6xl font-handwriting font-bold tracking-wider">
          GYMFIT
        </h1>
      </div>

      {/* Products List */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full max-w-sm mx-auto space-y-4">
          {isLoading && (
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="animate-pulse flex items-center space-x-4">
                <div className="w-16 h-20 bg-gray-300 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error al cargar productos: {error}
            </div>
          )}

          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 shadow-lg flex items-center space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-20 bg-orange-400 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "🧃"
                    )}
                  </div>
                  <div className="bg-orange-400 text-white text-xs px-2 py-1 rounded mt-1 text-center">
                    {product.size}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-black text-sm font-medium">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs">{product.description}</p>
                  {product.price && (
                    <p className="text-gymfit-red text-xs font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Consultar Button */}
        <div className="w-full max-w-sm mx-auto mt-8">
          {consultationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {consultationError}
            </div>
          )}
          <button
            onClick={handleConsult}
            disabled={isSubmitting || isLoading}
            className="w-full bg-gymfit-red text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "ENVIANDO..." : "CONSULTAR(En Desarrollo)"}
          </button>
        </div>
      </div>
    </div>
  );
}
