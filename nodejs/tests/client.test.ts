/**
 * Tests for the Structurify client.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Structurify } from '../src/client';
import {
  AuthenticationError,
  InsufficientCreditsError,
  NotFoundError,
  RateLimitError,
  ValidationError,
  ServerError,
} from '../src/errors';

describe('Structurify Client', () => {
  describe('initialization', () => {
    it('initializes with API key', () => {
      const client = new Structurify({ apiKey: 'sk_test_123' });
      expect(client).toBeDefined();
      expect(client.templates).toBeDefined();
      expect(client.projects).toBeDefined();
      expect(client.documents).toBeDefined();
      expect(client.extraction).toBeDefined();
      expect(client.exports).toBeDefined();
    });

    it('throws error without API key', () => {
      expect(() => new Structurify({ apiKey: '' })).toThrow('API key is required');
    });

    it('accepts custom base URL', () => {
      const client = new Structurify({
        apiKey: 'sk_test_123',
        baseUrl: 'https://custom.example.com/api/',
      });
      expect(client).toBeDefined();
    });

    it('accepts custom timeout', () => {
      const client = new Structurify({
        apiKey: 'sk_test_123',
        timeout: 60000,
      });
      expect(client).toBeDefined();
    });

    it('accepts custom max retries', () => {
      const client = new Structurify({
        apiKey: 'sk_test_123',
        maxRetries: 5,
      });
      expect(client).toBeDefined();
    });
  });

  describe('error handling', () => {
    let fetchMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('throws AuthenticationError on 401', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'AUTH_ERROR', message: 'Invalid API key' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_invalid' });
      await expect(client.get('/projects')).rejects.toThrow(AuthenticationError);
    });

    it('throws InsufficientCreditsError on 402', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 402,
        json: async () => ({ error: 'INSUFFICIENT_CREDITS', message: 'Not enough credits' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      await expect(client.post('/extraction-jobs')).rejects.toThrow(InsufficientCreditsError);
    });

    it('throws NotFoundError on 404', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'NOT_FOUND', message: 'Project not found' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      await expect(client.get('/projects/proj_notfound')).rejects.toThrow(NotFoundError);
    });

    it('throws RateLimitError on 429', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({ 'Retry-After': '30' }),
        json: async () => ({ error: 'RATE_LIMIT', message: 'Too many requests' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123', maxRetries: 0 });

      try {
        await client.get('/projects');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfter).toBe(30);
      }
    });

    it('throws ValidationError on 400', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'VALIDATION_ERROR', message: 'Name is required' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      await expect(client.post('/projects')).rejects.toThrow(ValidationError);
    });

    it('throws ServerError on 500', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'SERVER_ERROR', message: 'Internal server error' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123', maxRetries: 0 });
      await expect(client.get('/projects')).rejects.toThrow(ServerError);
    });
  });

  describe('HTTP requests', () => {
    let fetchMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('makes GET request correctly', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ projects: [{ id: 'proj_1', name: 'Test' }] }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.get<{ projects: Array<{ id: string; name: string }> }>('/projects');

      expect(result.projects).toHaveLength(1);
      expect(result.projects[0].id).toBe('proj_1');
    });

    it('makes POST request correctly', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'proj_new', name: 'New Project' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.post<{ id: string; name: string }>('/projects', {
        name: 'New Project',
      });

      expect(result.id).toBe('proj_new');
    });

    it('makes DELETE request correctly', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.delete<{ success: boolean }>('/projects/proj_123');

      expect(result.success).toBe(true);
    });

    it('sends Authorization header', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ projects: [] }),
      });

      const client = new Structurify({ apiKey: 'sk_test_secret_key' });
      await client.get('/projects');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer sk_test_secret_key',
          }),
        })
      );
    });
  });
});
