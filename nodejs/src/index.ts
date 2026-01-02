/**
 * Structurify SDK for Node.js
 *
 * Official Node.js SDK for the Structurify document extraction API.
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

export { Structurify } from './client';

export {
  StructurifyError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ValidationError,
  InsufficientCreditsError,
  ServerError,
} from './errors';

export { verifyWebhookSignature, computeSignature } from './webhooks';

export type {
  StructurifyConfig,
  ProjectTemplate,
  ColumnTemplate,
  ColumnFormat,
  Project,
  Column,
  Document,
  DocumentStatus,
  ExtractionJob,
  JobStatus,
  Export,
  ExportFormat,
  ExportStatus,
  ApiError,
  ApiResponse,
  CreateProjectParams,
  UploadDocumentParams,
  CreateExportParams,
  WaitOptions,
} from './types';
