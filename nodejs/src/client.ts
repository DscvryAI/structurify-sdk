/**
 * Structurify Client
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import type { StructurifyConfig } from './types';
import {
  StructurifyError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ValidationError,
  InsufficientCreditsError,
  ServerError,
} from './errors';
import { TemplatesResource } from './resources/templates';
import { ProjectsResource } from './resources/projects';
import { DocumentsResource } from './resources/documents';
import { ExtractionResource } from './resources/extraction';
import { ExportsResource } from './resources/exports';

const DEFAULT_BASE_URL = 'https://app.structurify.ai/api';
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class Structurify {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;
  private maxRetries: number;

  public templates: TemplatesResource;
  public projects: ProjectsResource;
  public documents: DocumentsResource;
  public extraction: ExtractionResource;
  public exports: ExportsResource;

  constructor(config: StructurifyConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
    this.maxRetries = config.maxRetries ?? MAX_RETRIES;

    this.templates = new TemplatesResource(this);
    this.projects = new ProjectsResource(this);
    this.documents = new DocumentsResource(this);
    this.extraction = new ExtractionResource(this);
    this.exports = new ExportsResource(this);
  }

  async request<T = Record<string, unknown>>(
    method: string,
    path: string,
    options?: {
      params?: Record<string, string>;
      body?: Record<string, unknown>;
      formData?: FormData;
    }
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (options?.params) {
      for (const [key, value] of Object.entries(options.params)) {
        url.searchParams.set(key, value);
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      'User-Agent': 'structurify-node/1.0.0',
    };

    if (options?.body) {
      headers['Content-Type'] = 'application/json';
    }

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url.toString(), {
          method,
          headers,
          body: options?.body ? JSON.stringify(options.body) : options?.formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        return await this.handleResponse<T>(response);
      } catch (error) {
        lastError = error as Error;

        if (error instanceof RateLimitError) {
          if (attempt < this.maxRetries) {
            const delay = error.retryAfter
              ? error.retryAfter * 1000
              : RETRY_DELAY * Math.pow(2, attempt);
            await this.sleep(delay);
            continue;
          }
        }

        if (
          error instanceof Error &&
          (error.name === 'AbortError' || error.message.includes('fetch'))
        ) {
          if (attempt < this.maxRetries) {
            await this.sleep(RETRY_DELAY * Math.pow(2, attempt));
            continue;
          }
        }

        throw error;
      }
    }

    throw lastError ?? new StructurifyError('Request failed');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let data: Record<string, unknown>;

    try {
      data = (await response.json()) as Record<string, unknown>;
    } catch {
      data = { error: 'InvalidResponse', message: await response.text() };
    }

    if (response.ok) {
      return data as T;
    }

    const errorCode = (data['error'] as string) ?? 'Unknown';
    const errorMessage = (data['message'] as string) ?? 'An error occurred';

    switch (response.status) {
      case 401:
        throw new AuthenticationError(errorMessage);
      case 402:
        throw new InsufficientCreditsError(errorMessage);
      case 404:
        throw new NotFoundError(errorMessage);
      case 429: {
        const retryAfter = response.headers.get('Retry-After');
        throw new RateLimitError(
          errorMessage,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        );
      }
      case 400:
        throw new ValidationError(errorMessage);
      default:
        if (response.status >= 500) {
          throw new ServerError(errorMessage);
        }
        throw new StructurifyError(errorMessage, {
          code: errorCode,
          statusCode: response.status,
          response: data,
        });
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get<T = Record<string, unknown>>(
    path: string,
    params?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('GET', path, { params });
  }

  async post<T = Record<string, unknown>>(
    path: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>('POST', path, { body });
  }

  async put<T = Record<string, unknown>>(
    path: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>('PUT', path, { body });
  }

  async delete<T = Record<string, unknown>>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}
