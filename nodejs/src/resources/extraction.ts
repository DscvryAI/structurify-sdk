/**
 * Extraction Resource
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import type { Structurify } from '../client';
import type { ExtractionJob, WaitOptions } from '../types';

interface CreateJobResponse {
  success: boolean;
  job: ExtractionJob;
}

interface GetJobResponse {
  success: boolean;
  job: ExtractionJob;
}

interface ListJobsResponse {
  success: boolean;
  jobs: ExtractionJob[];
}

interface CancelJobResponse {
  success: boolean;
  message: string;
}

const TERMINAL_STATES = new Set(['done', 'error', 'cancelled']);

export class ExtractionResource {
  private client: Structurify;

  constructor(client: Structurify) {
    this.client = client;
  }

  /**
   * Start an extraction job for a project.
   * Consumes 1 credit per document extracted.
   */
  async run(projectId: string): Promise<ExtractionJob> {
    const response = await this.client.post<CreateJobResponse>('/extraction-jobs', {
      projectId,
    });
    return response.job;
  }

  /**
   * Get extraction job status.
   */
  async get(jobId: string): Promise<ExtractionJob> {
    const response = await this.client.get<GetJobResponse>(`/extraction-jobs/${jobId}`);
    return response.job;
  }

  /**
   * Cancel an extraction job.
   */
  async cancel(jobId: string): Promise<CancelJobResponse> {
    return this.client.delete<CancelJobResponse>(`/extraction-jobs/${jobId}`);
  }

  /**
   * Wait for an extraction job to complete.
   */
  async waitForCompletion(
    jobId: string,
    options?: WaitOptions
  ): Promise<ExtractionJob> {
    const timeout = options?.timeout ?? 300000; // 5 minutes default
    const pollInterval = options?.pollInterval ?? 2000; // 2 seconds default
    const startTime = Date.now();

    while (true) {
      const job = await this.get(jobId);

      if (TERMINAL_STATES.has(job.status)) {
        return job;
      }

      const elapsed = Date.now() - startTime;
      if (elapsed >= timeout) {
        throw new Error(
          `Job ${jobId} did not complete within ${timeout}ms. ` +
            `Current status: ${job.status}, progress: ${job.progress}%`
        );
      }

      await this.sleep(pollInterval);
    }
  }

  /**
   * List extraction jobs for a project.
   */
  async list(projectId: string): Promise<ExtractionJob[]> {
    const response = await this.client.get<ListJobsResponse>('/extraction-jobs', {
      projectId,
    });
    return response.jobs ?? [];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
