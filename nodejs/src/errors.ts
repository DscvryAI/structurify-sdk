/**
 * Structurify SDK Errors
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

export class StructurifyError extends Error {
  code?: string;
  statusCode?: number;
  response?: Record<string, unknown>;

  constructor(
    message: string,
    options?: {
      code?: string;
      statusCode?: number;
      response?: Record<string, unknown>;
    }
  ) {
    super(message);
    this.name = 'StructurifyError';
    this.code = options?.code;
    this.statusCode = options?.statusCode;
    this.response = options?.response;
  }
}

export class AuthenticationError extends StructurifyError {
  constructor(message = 'Authentication failed') {
    super(message, { code: 'AUTH_ERROR', statusCode: 401 });
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends StructurifyError {
  retryAfter?: number;

  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, { code: 'RATE_LIMIT', statusCode: 429 });
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class NotFoundError extends StructurifyError {
  constructor(message = 'Resource not found') {
    super(message, { code: 'NOT_FOUND', statusCode: 404 });
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends StructurifyError {
  constructor(message = 'Validation error') {
    super(message, { code: 'VALIDATION_ERROR', statusCode: 400 });
    this.name = 'ValidationError';
  }
}

export class InsufficientCreditsError extends StructurifyError {
  constructor(message = 'Insufficient credits') {
    super(message, { code: 'INSUFFICIENT_CREDITS', statusCode: 402 });
    this.name = 'InsufficientCreditsError';
  }
}

export class ServerError extends StructurifyError {
  constructor(message = 'Server error') {
    super(message, { code: 'SERVER_ERROR', statusCode: 500 });
    this.name = 'ServerError';
  }
}
