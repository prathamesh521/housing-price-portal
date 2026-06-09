import axios, { AxiosError } from "axios";

import type {
  HealthResponse,
  HouseFeatures,
  ModelInfo,
  PredictionResponse,
} from "@/types/prediction";

function getBaseURL(): string {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000";
  }

  return "/api";
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ detail?: string | { msg: string }[] }>;
    const detail = axiosError.response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail) && detail.length > 0) {
      return detail.map((item) => item.msg).join(", ");
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

export async function checkHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>("/health");
  return data;
}

export async function getModelInfo(): Promise<ModelInfo> {
  const { data } = await apiClient.get<ModelInfo>("/model-info");
  return data;
}

export async function predictPrice(
  features: HouseFeatures
): Promise<PredictionResponse> {
  const { data } = await apiClient.post<PredictionResponse>(
    "/predict",
    features
  );
  return data;
}
