// lib/api.ts
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      cache: "no-store", // همیشه تازه بگیرد
    });
    const json = await res.json();
    if (!res.ok) {
      return { ok: false, error: json.message || "خطای سروری" };
    }
    return { ok: true, data: json };
  } catch (err) {
    console.error("HTTP Error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "خطای نامشخص",
    };
  }
}

