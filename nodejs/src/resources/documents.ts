/**
 * Documents Resource
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import { readFile } from 'fs/promises';
import { basename, extname } from 'path';
import type { Structurify } from '../client';
import type { Document, UploadDocumentParams } from '../types';

const MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.tiff': 'image/tiff',
  '.tif': 'image/tiff',
  '.bmp': 'image/bmp',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

function getMimeType(filename: string): string {
  const ext = extname(filename).toLowerCase();
  return MIME_TYPES[ext] ?? 'application/octet-stream';
}

interface UploadDocumentResponse {
  success: boolean;
  document: Document;
}

interface GetDocumentResponse {
  success: boolean;
  document: Document;
}

interface GetContentResponse {
  success: boolean;
  content: string;
  mimeType: string;
}

interface DeleteDocumentResponse {
  success: boolean;
  message: string;
}

export class DocumentsResource {
  private client: Structurify;

  constructor(client: Structurify) {
    this.client = client;
  }

  /**
   * Upload a document from a file path.
   */
  async uploadFromPath(
    projectId: string,
    filePath: string,
    name?: string
  ): Promise<Document> {
    const content = await readFile(filePath);
    const fileName = name ?? basename(filePath);
    const mimeType = getMimeType(fileName);

    return this.upload({
      projectId,
      file: content,
      name: fileName,
      mimeType,
    });
  }

  /**
   * Upload a document.
   */
  async upload(params: UploadDocumentParams): Promise<Document> {
    let content: Buffer;

    if (Buffer.isBuffer(params.file)) {
      content = params.file;
    } else {
      // Handle readable stream
      const chunks: Buffer[] = [];
      for await (const chunk of params.file) {
        chunks.push(Buffer.from(chunk));
      }
      content = Buffer.concat(chunks);
    }

    const mimeType = params.mimeType ?? getMimeType(params.name);
    const base64Content = content.toString('base64');

    const response = await this.client.post<UploadDocumentResponse>('/documents', {
      projectId: params.projectId,
      fileName: params.name,
      content: base64Content,
      mimeType,
    });

    return response.document;
  }

  /**
   * Get document metadata.
   */
  async get(documentId: string): Promise<Document> {
    const response = await this.client.get<GetDocumentResponse>(
      `/documents/${documentId}`
    );
    return response.document;
  }

  /**
   * Get document content as base64.
   */
  async getContent(documentId: string): Promise<GetContentResponse> {
    return this.client.get<GetContentResponse>(`/documents/${documentId}/content`);
  }

  /**
   * Download document content as Buffer.
   */
  async download(documentId: string): Promise<Buffer> {
    const response = await this.getContent(documentId);
    return Buffer.from(response.content, 'base64');
  }

  /**
   * Delete a document.
   */
  async delete(documentId: string): Promise<DeleteDocumentResponse> {
    return this.client.delete<DeleteDocumentResponse>(`/documents/${documentId}`);
  }
}
