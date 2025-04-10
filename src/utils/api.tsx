// API request utility functions
import { showToast } from "./toast";

// Generic API error type
interface ApiError {
  message?: string;
  status?: number;
}

// Main fetchWithAuth function
export const fetchWithAuth = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({} as ApiError));
      throw new Error(errorData.message || `请求失败: ${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "网络请求失败";
    console.error(`API请求错误 (${url}):`, error);

    // Use our shared toast utility instead of manually creating DOM elements
    showToast(errorMessage, "error");

    throw error;
  }
};
