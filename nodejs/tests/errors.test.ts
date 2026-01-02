/**
 * Tests for SDK errors.
 */

import { describe, it, expect } from 'vitest';
import {
  StructurifyError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ValidationError,
  InsufficientCreditsError,
  ServerError,
} from '../src/errors';

describe('StructurifyError', () => {
  it('has message', () => {
    const error = new StructurifyError('Something went wrong');
    expect(error.message).toBe('Something went wrong');
    expect(error.name).toBe('StructurifyError');
  });

  it('has optional code', () => {
    const error = new StructurifyError('Test error', { code: 'TEST_CODE' });
    expect(error.code).toBe('TEST_CODE');
  });

  it('has optional statusCode', () => {
    const error = new StructurifyError('Test', { statusCode: 418 });
    expect(error.statusCode).toBe(418);
  });

  it('has optional response', () => {
    const response = { error: 'TEST', details: { field: 'name' } };
    const error = new StructurifyError('Test', { response });
    expect(error.response).toEqual(response);
  });
});

describe('AuthenticationError', () => {
  it('has default message', () => {
    const error = new AuthenticationError();
    expect(error.message).toBe('Authentication failed');
    expect(error.code).toBe('AUTH_ERROR');
    expect(error.statusCode).toBe(401);
    expect(error.name).toBe('AuthenticationError');
  });

  it('accepts custom message', () => {
    const error = new AuthenticationError('Invalid API key format');
    expect(error.message).toBe('Invalid API key format');
  });
});

describe('RateLimitError', () => {
  it('has default message', () => {
    const error = new RateLimitError();
    expect(error.message).toBe('Rate limit exceeded');
    expect(error.code).toBe('RATE_LIMIT');
    expect(error.statusCode).toBe(429);
    expect(error.retryAfter).toBeUndefined();
    expect(error.name).toBe('RateLimitError');
  });

  it('stores retryAfter', () => {
    const error = new RateLimitError('Rate limited', 60);
    expect(error.retryAfter).toBe(60);
  });
});

describe('NotFoundError', () => {
  it('has default message', () => {
    const error = new NotFoundError();
    expect(error.message).toBe('Resource not found');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('NotFoundError');
  });
});

describe('ValidationError', () => {
  it('has default message', () => {
    const error = new ValidationError();
    expect(error.message).toBe('Validation error');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('ValidationError');
  });
});

describe('InsufficientCreditsError', () => {
  it('has default message', () => {
    const error = new InsufficientCreditsError();
    expect(error.message).toBe('Insufficient credits');
    expect(error.code).toBe('INSUFFICIENT_CREDITS');
    expect(error.statusCode).toBe(402);
    expect(error.name).toBe('InsufficientCreditsError');
  });
});

describe('ServerError', () => {
  it('has default message', () => {
    const error = new ServerError();
    expect(error.message).toBe('Server error');
    expect(error.code).toBe('SERVER_ERROR');
    expect(error.statusCode).toBe(500);
    expect(error.name).toBe('ServerError');
  });
});
