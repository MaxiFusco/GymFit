import { useState, useEffect } from "react";
import { apiClient, Routine, Diet, Product } from "../lib/api";

// Generic hook for data fetching
function useApiData<T>(
  fetchFn: () => Promise<{ success: boolean; data: T; error?: string }>,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchFn();

        if (response.success) {
          setData(response.data);
        } else {
          setError(response.error || "Failed to fetch data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchFn();

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
}

// Specific hooks for different data types
export function useRoutines() {
  return useApiData<Routine[]>(() => apiClient.getRoutines());
}

export function useRoutine(id: number) {
  return useApiData<Routine>(() => apiClient.getRoutine(id));
}

export function useDiets() {
  return useApiData<Diet[]>(() => apiClient.getDiets());
}

export function useDiet(id: number) {
  return useApiData<Diet>(() => apiClient.getDiet(id));
}

export function useProducts() {
  return useApiData<Product[]>(() => apiClient.getProducts());
}

export function useProduct(id: number) {
  return useApiData<Product>(() => apiClient.getProduct(id));
}

// Hook for consultations
export function useConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitConsultation = async (type: string, data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await apiClient.submitConsultation(type, data);

      if (!response.success) {
        throw new Error(response.error || "Failed to submit consultation");
      }

      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit consultation";
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitConsultation, isSubmitting, error };
}
