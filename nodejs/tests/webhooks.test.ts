/**
 * Tests for webhook utilities.
 */

import { describe, it, expect } from 'vitest';
import { verifyWebhookSignature, computeSignature } from '../src/webhooks';

describe('Webhook Signature', () => {
  describe('verifyWebhookSignature', () => {
    it('returns true for valid signature', () => {
      const payload = '{"event": "extraction.completed", "data": {"jobId": "job_123"}}';
      const secret = 'whsec_test_secret';
      const signature = computeSignature(payload, secret);

      expect(
        verifyWebhookSignature({
          payload,
          signature,
          secret,
        })
      ).toBe(true);
    });

    it('returns false for invalid signature', () => {
      const payload = '{"event": "extraction.completed"}';
      const secret = 'whsec_test_secret';

      expect(
        verifyWebhookSignature({
          payload,
          signature: 'invalid_signature',
          secret,
        })
      ).toBe(false);
    });

    it('returns false for wrong secret', () => {
      const payload = '{"event": "extraction.completed"}';
      const secret = 'whsec_correct_secret';
      const wrongSecret = 'whsec_wrong_secret';
      const signature = computeSignature(payload, secret);

      expect(
        verifyWebhookSignature({
          payload,
          signature,
          secret: wrongSecret,
        })
      ).toBe(false);
    });

    it('handles signature with sha256= prefix', () => {
      const payload = '{"event": "test"}';
      const secret = 'whsec_test';
      const signature = computeSignature(payload, secret);

      // computeSignature returns with sha256= prefix
      expect(signature.startsWith('sha256=')).toBe(true);
      expect(
        verifyWebhookSignature({
          payload,
          signature,
          secret,
        })
      ).toBe(true);
    });

    it('handles signature without sha256= prefix', () => {
      const payload = '{"event": "test"}';
      const secret = 'whsec_test';
      const signature = computeSignature(payload, secret);

      // Remove prefix
      const rawSignature = signature.replace('sha256=', '');
      expect(
        verifyWebhookSignature({
          payload,
          signature: rawSignature,
          secret,
        })
      ).toBe(true);
    });

    it('handles Buffer payload', () => {
      const payload = Buffer.from('{"event": "test"}');
      const secret = 'whsec_test';
      const signature = computeSignature(payload, secret);

      expect(
        verifyWebhookSignature({
          payload,
          signature,
          secret,
        })
      ).toBe(true);
    });
  });

  describe('computeSignature', () => {
    it('returns correct format', () => {
      const payload = '{"test": true}';
      const secret = 'secret123';
      const signature = computeSignature(payload, secret);

      expect(signature.startsWith('sha256=')).toBe(true);
      expect(signature).toHaveLength(71); // "sha256=" (7) + 64 hex chars
    });

    it('is deterministic', () => {
      const payload = '{"event": "test"}';
      const secret = 'whsec_test';

      const sig1 = computeSignature(payload, secret);
      const sig2 = computeSignature(payload, secret);

      expect(sig1).toBe(sig2);
    });

    it('produces different signatures for different payloads', () => {
      const secret = 'whsec_test';

      const sig1 = computeSignature('{"event": "a"}', secret);
      const sig2 = computeSignature('{"event": "b"}', secret);

      expect(sig1).not.toBe(sig2);
    });
  });
});
