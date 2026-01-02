/**
 * Exports Resource
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import type { Structurify } from '../client';
import type { Export, CreateExportParams } from '../types';

interface CreateExportResponse {
  success: boolean;
  export: Export;
  data?: string;
  downloadUrl?: string;
}

interface GetExportResponse {
  success: boolean;
  export: Export;
}

interface ListExportsResponse {
  success: boolean;
  exports: Export[];
}

interface DownloadExportResponse {
  data?: string;
  [key: string]: unknown;
}

interface DeleteExportResponse {
  success: boolean;
  message: string;
}

export class ExportsResource {
  private client: Structurify;

  constructor(client: Structurify) {
    this.client = client;
  }

  /**
   * Create an export.
   */
  async create(params: CreateExportParams): Promise<CreateExportResponse> {
    return this.client.post<CreateExportResponse>('/exports', {
      projectId: params.projectId,
      format: params.format,
      documentIds: params.documentIds,
    });
  }

  /**
   * Get export status.
   */
  async get(exportId: string): Promise<Export> {
    const response = await this.client.get<GetExportResponse>(`/exports/${exportId}`);
    return response.export;
  }

  /**
   * Download export data.
   */
  async download(exportId: string): Promise<string | Record<string, unknown>> {
    const response = await this.client.get<DownloadExportResponse>(
      `/exports/${exportId}/download`
    );

    if (response.data !== undefined) {
      return response.data;
    }
    return response;
  }

  /**
   * List exports for a project.
   */
  async list(projectId: string): Promise<Export[]> {
    const response = await this.client.get<ListExportsResponse>('/exports', {
      projectId,
    });
    return response.exports ?? [];
  }

  /**
   * Delete an export.
   */
  async delete(exportId: string): Promise<DeleteExportResponse> {
    return this.client.delete<DeleteExportResponse>(`/exports/${exportId}`);
  }
}
