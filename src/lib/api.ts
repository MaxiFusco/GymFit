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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
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
