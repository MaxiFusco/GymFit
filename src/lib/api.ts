// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8081/api";

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Data Types
export interface User {
  id: number;
  email: string;
  name: string;
  age: number;
  createdAt: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Routine {
  id: number;
  title: string;
  description: string;
  content: string;
  level: "superior" | "medio" | "inferior";
  exercises?: Exercise[];
}

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  description: string;
}

export interface Diet {
  id: number;
  title: string;
  description: string;
  content: string;
  type: "vegetariano" | "vegano" | "carne";
  meals?: Meal[];
}

export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl: string;
  category: string;
}

// HTTP Client Class
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("gymfit_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      // Leer el cuerpo como texto
      const text = await response.text();

      // Intentar parsear JSON
      let data: ApiResponse<T>;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {
          success: false,
          message: text || "Respuesta inválida del servidor",
        } as ApiResponse<T>;
      }

      if (!response.ok) {
        // Si la respuesta no es OK, devolver error con mensaje
        return {
          success: false,
          message: data.message || `Error HTTP: ${response.status}`,
        } as ApiResponse<T>;
      }

      // Respuesta OK
      return data;

    } catch (error: any) {
      console.error("API request failed:", error);
      return {
        success: false,
        message: error.message || "Error de red",
      } as ApiResponse<T>;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("gymfit_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("gymfit_token");
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(
    userData: RegisterRequest,
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    const response = await this.request<null>("/auth/logout", {
      method: "POST",
    });
    this.clearToken();
    return response;
  }

  // Routines endpoints
  async getRoutines(): Promise<ApiResponse<Routine[]>> {
    return this.request<Routine[]>("/routines");
  }

  async getRoutine(id: number): Promise<ApiResponse<Routine>> {
    return this.request<Routine>(`/routines/${id}`);
  }

  // Diets endpoints
  async getDiets(): Promise<ApiResponse<Diet[]>> {
    return this.request<Diet[]>("/diets");
  }

  async getDiet(id: number): Promise<ApiResponse<Diet>> {
    return this.request<Diet>(`/diets/${id}`);
  }

  async updateDiet(diet: Diet): Promise<ApiResponse<Diet>> {
    return this.request<Diet>(`/diets/${diet.id}`, {
      method: "PUT",
      body: JSON.stringify(diet),
    });
  }

  async getDietById(id: number): Promise<ApiResponse<Diet>> {
    return this.request<Diet>(`/diets/${id}`);
  }

  // Products endpoints
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>("/products");
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`);
  }

  // Consultation endpoint
  async submitConsultation(type: string, data: any): Promise<ApiResponse<any>> {
    return this.request<any>("/consultations", {
      method: "POST",
      body: JSON.stringify({ type, data }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
