import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Routines from "./pages/Routines";
import Diets from "./pages/Diets";
import Products from "./pages/Products";
import RoutineDetail from "./pages/RoutineDetail";
import DietDetail from "./pages/DietDetail";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="gym-background min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/diets" element={<Diets />} />
            <Route path="/products" element={<Products />} />
            <Route path="/routine/:id" element={<RoutineDetail />} />
            <Route path="/diet/:id" element={<DietDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
