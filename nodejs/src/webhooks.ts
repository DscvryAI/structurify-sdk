/**
 * Webhook Utilities
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import { createHmac, timingSafeEqual } from 'crypto';

export interface VerifySignatureParams {
  payload: string | Buffer;
  signature: string;
  secret: string;
}

/**
 * Verify a webhook signature.
 *
 * Structurify signs webhook payloads using HMAC-SHA256.
 * The signature is sent in the X-Structurify-Signature header.
 *
 * @example
 * ```typescript
 * import { verifyWebhookSignature } from '@structurify/sdk';
 *
 * app.post('/webhook', (req, res) => {
 *   const isValid = verifyWebhookSignature({
 *     payload: req.body,
 *     signature: req.headers['x-structurify-signature'],
 *     secret: 'your_webhook_secret',
 *   });
 *
 *   if (!isValid) {
 *     return res.status(401).json({ error: 'Invalid signature' });
 *   }
 *
 *   // Process webhook
 * });
 * ```
 */
export function verifyWebhookSignature(params: VerifySignatureParams): boolean {
  const { payload, signature, secret } = params;

  const payloadBuffer = Buffer.isBuffer(payload)
    ? payload
    : Buffer.from(payload, 'utf-8');

  // Remove "sha256=" prefix if present
  const sig = signature.startsWith('sha256=') ? signature.slice(7) : signature;

  const expected = createHmac('sha256', secret).update(payloadBuffer).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(sig, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Compute HMAC-SHA256 signature for a payload.
 * Useful for testing webhook handlers.
 */
export function computeSignature(payload: string | Buffer, secret: string): string {
  const payloadBuffer = Buffer.isBuffer(payload)
    ? payload
    : Buffer.from(payload, 'utf-8');

  const sig = createHmac('sha256', secret).update(payloadBuffer).digest('hex');
  return `sha256=${sig}`;
}
