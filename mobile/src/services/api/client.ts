import {ApiError, ApiEnvelope} from '@shared/index';
import {env} from '@/utils/env';

type RequestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  accessToken?: string;
};

export async function apiRequest<T>(
  path: string,
  config: RequestConfig = {},
): Promise<ApiEnvelope<T>> {
  const response = await fetch(`${env.API_BASE_URL}${path}`, {
    method: config.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(config.accessToken
        ? {Authorization: `Bearer ${config.accessToken}`}
        : {}),
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  if (!response.ok) {
    const error = (await response.json()) as ApiError;
    throw error;
  }

  return (await response.json()) as ApiEnvelope<T>;
}

