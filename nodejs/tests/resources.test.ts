/**
 * Tests for resource handlers.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Structurify } from '../src/client';

describe('Resources', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('TemplatesResource', () => {
    it('lists templates', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          templates: [
            { id: 'tpl_invoice', name: 'Invoice', description: 'Invoice extraction' },
            { id: 'tpl_receipt', name: 'Receipt', description: 'Receipt extraction' },
          ],
        }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.templates.list();

      // list() returns the extracted templates array
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('tpl_invoice');
    });

    it('gets template by ID', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        // get() expects response.template
        json: async () => ({ template: { id: 'tpl_invoice', name: 'Invoice', columns: [] } }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.templates.get('tpl_invoice');

      expect(result.id).toBe('tpl_invoice');
    });
  });

  describe('ProjectsResource', () => {
    it('lists projects', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          projects: [{ id: 'proj_1', name: 'Test Project' }],
        }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.projects.list();

      // list() returns the extracted projects array
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('proj_1');
    });

    it('creates project', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        // create() expects response.project
        json: async () => ({ project: { id: 'proj_new', name: 'My Project' } }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.projects.create({
        name: 'My Project',
        templateId: 'tpl_invoice',
      });

      expect(result.id).toBe('proj_new');
      expect(result.name).toBe('My Project');
    });

    it('gets project by ID', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'proj_123',
          name: 'Test',
          columns: [],
          documents: [],
        }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.projects.get('proj_123');

      expect(result.id).toBe('proj_123');
    });

    it('deletes project', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.projects.delete('proj_123');

      expect(result.success).toBe(true);
    });
  });

  describe('ExtractionResource', () => {
    it('runs extraction', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        // run() expects response.job
        json: async () => ({ job: { id: 'job_123', status: 'PROCESSING' } }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.extraction.run('proj_123');

      expect(result.id).toBe('job_123');
      expect(result.status).toBe('PROCESSING');
    });

    it('gets extraction status', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        // get() expects response.job
        json: async () => ({
          job: {
            id: 'job_123',
            status: 'COMPLETED',
            completedTasks: 10,
          },
        }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.extraction.get('job_123');

      expect(result.status).toBe('COMPLETED');
    });

    it('cancels extraction', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        // cancel() returns response directly
        json: async () => ({ success: true, message: 'Job cancelled' }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.extraction.cancel('job_123');

      expect(result.success).toBe(true);
    });
  });

  describe('ExportsResource', () => {
    it('creates export', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          export: { id: 'exp_123', format: 'csv' },
        }),
      });

      const client = new Structurify({ apiKey: 'sk_test_123' });
      const result = await client.exports.create({
        projectId: 'proj_123',
        format: 'csv',
      });

      expect(result.export.id).toBe('exp_123');
      expect(result.export.format).toBe('csv');
    });
  });
});
