/**
 * Templates Resource
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import type { Structurify } from '../client';
import type { ProjectTemplate, ColumnTemplate } from '../types';

interface ListTemplatesResponse {
  success: boolean;
  templates: ProjectTemplate[];
}

interface ListColumnTemplatesResponse {
  success: boolean;
  templates: ColumnTemplate[];
}

interface GetTemplateResponse {
  success: boolean;
  template: ProjectTemplate;
}

export class TemplatesResource {
  private client: Structurify;

  constructor(client: Structurify) {
    this.client = client;
  }

  /**
   * List all available project templates.
   */
  async list(): Promise<ProjectTemplate[]> {
    const response = await this.client.get<ListTemplatesResponse>('/project-templates');
    return response.templates ?? [];
  }

  /**
   * List all available column templates.
   */
  async listColumns(): Promise<ColumnTemplate[]> {
    const response = await this.client.get<ListColumnTemplatesResponse>('/templates');
    return response.templates ?? [];
  }

  /**
   * Get a specific project template by ID.
   */
  async get(templateId: string): Promise<ProjectTemplate> {
    const response = await this.client.get<GetTemplateResponse>(
      `/project-templates/${templateId}`
    );
    return response.template;
  }
}
