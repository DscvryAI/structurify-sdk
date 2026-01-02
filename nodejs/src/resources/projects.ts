/**
 * Projects Resource
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import type { Structurify } from '../client';
import type { Project, Column, Document, CreateProjectParams } from '../types';

interface ListProjectsResponse {
  success: boolean;
  projects: Project[];
}

interface GetProjectResponse {
  success: boolean;
  project: Project;
  columns: Column[];
  documents: Document[];
}

interface CreateProjectResponse {
  success: boolean;
  project: Project;
}

interface DeleteProjectResponse {
  success: boolean;
  message: string;
}

export class ProjectsResource {
  private client: Structurify;

  constructor(client: Structurify) {
    this.client = client;
  }

  /**
   * List all projects.
   */
  async list(): Promise<Project[]> {
    const response = await this.client.get<ListProjectsResponse>('/projects');
    return response.projects ?? [];
  }

  /**
   * Get a project by ID with its columns and documents.
   */
  async get(projectId: string): Promise<GetProjectResponse> {
    return this.client.get<GetProjectResponse>(`/projects/${projectId}`);
  }

  /**
   * Create a new project from a template.
   */
  async create(params: CreateProjectParams): Promise<Project> {
    const response = await this.client.post<CreateProjectResponse>('/projects', {
      name: params.name,
      templateId: params.templateId,
      description: params.description,
    });
    return response.project;
  }

  /**
   * Update a project name.
   */
  async update(projectId: string, name: string): Promise<Project> {
    const response = await this.client.put<CreateProjectResponse>(
      `/projects/${projectId}`,
      { name }
    );
    return response.project;
  }

  /**
   * Delete a project and all its documents.
   */
  async delete(projectId: string): Promise<DeleteProjectResponse> {
    return this.client.delete<DeleteProjectResponse>(`/projects/${projectId}`);
  }
}
