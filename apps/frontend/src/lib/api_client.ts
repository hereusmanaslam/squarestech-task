import { getApiBaseUrl } from './env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type Json = Record<string, unknown> | unknown[] | string | number | boolean | null;

function getErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  if (!('message' in data)) return null;

  const message = (data as { message?: unknown }).message;
  if (typeof message === 'string') return message;
  if (Array.isArray(message) && message.every((m) => typeof m === 'string')) return message.join(', ');
  return null;
}

export async function apiRequest<TResponse extends Json>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (res.status === 204) {
    return null as TResponse;
  }

  const text = await res.text();
  const data = text ? (JSON.parse(text) as TResponse) : (null as TResponse);

  if (!res.ok) {
    const message = getErrorMessage(data) ?? `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }

  return data;
}

