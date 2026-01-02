/**
 * Structurify SDK Types
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

export interface StructurifyConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  columns?: ColumnTemplate[];
}

export interface ColumnTemplate {
  id: string;
  label: string;
  prompt: string;
  format: ColumnFormat;
  category?: string;
}

export type ColumnFormat = 'text' | 'number' | 'date' | 'boolean' | 'list' | 'table' | 'object';

export interface Project {
  id: string;
  name: string;
  templateId?: string;
  documentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  label: string;
  prompt: string;
  format: ColumnFormat;
  position: number;
}

export interface Document {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  status: DocumentStatus;
  createdAt: string;
}

export type DocumentStatus = 'pending' | 'processing' | 'done' | 'error';

export interface ExtractionJob {
  id: string;
  projectId: string;
  status: JobStatus;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  progress: number;
  mode: 'sync' | 'async';
  createdAt: string;
  completedAt?: string;
}

export type JobStatus = 'pending' | 'processing' | 'done' | 'error' | 'cancelled';

export interface Export {
  id: string;
  projectId: string;
  format: ExportFormat;
  status: ExportStatus;
  createdAt: string;
}

export type ExportFormat = 'csv' | 'json';
export type ExportStatus = 'pending' | 'ready' | 'error';

export interface ApiError {
  error: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateProjectParams {
  name: string;
  templateId: string;
  description?: string;
}

export interface UploadDocumentParams {
  projectId: string;
  file: Buffer | NodeJS.ReadableStream;
  name: string;
  mimeType?: string;
}

export interface CreateExportParams {
  projectId: string;
  format: ExportFormat;
  documentIds?: string[];
}

export interface WaitOptions {
  timeout?: number;
  pollInterval?: number;
}
