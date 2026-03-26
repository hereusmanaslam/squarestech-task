export function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';
  return baseUrl.replace(/\/+$/, '');
}

