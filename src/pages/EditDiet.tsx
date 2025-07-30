// src/pages/EditDiet.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient, Diet } from "../lib/api";
import { BackButton } from "../components/BackButton";

export default function EditDiet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [diet, setDiet] = useState<Diet | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchDiet = async () => {
      const response = await apiClient.getDietById(Number(id));
      if (response.success && response.data) {
        setDiet(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setContent(response.data.content);
      }
    };
    fetchDiet();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...diet, title, description, content };
    const res = await apiClient.updateDiet(updated as Diet);
    if (res.success) {
      navigate("/diets");
    } else {
      alert("Error al guardar los cambios.");
    }
  };

  if (!diet) return <p className="text-white">Cargando dieta...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10">
      <BackButton label="VOLVER" to="/diets" />
      <h1 className="text-3xl font-bold text-white mb-6">Editar Dieta</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
        <textarea
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
