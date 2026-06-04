export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const internalKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY ?? "";
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(internalKey ? { "X-Internal-Key": internalKey } : {}),
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${path} ${res.status}`);
  return res.json() as Promise<T>;
}
