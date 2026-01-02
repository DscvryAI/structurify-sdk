"""Tests for webhook utilities."""

import pytest
from structurify.webhooks import verify_signature, compute_signature


class TestWebhookSignature:
    """Test webhook signature verification."""

    def test_verify_valid_signature(self):
        """Valid signature returns True."""
        payload = '{"event": "extraction.completed", "data": {"jobId": "job_123"}}'
        secret = "whsec_test_secret"
        signature = compute_signature(payload, secret)

        assert verify_signature(payload, signature, secret) is True

    def test_verify_invalid_signature(self):
        """Invalid signature returns False."""
        payload = '{"event": "extraction.completed"}'
        secret = "whsec_test_secret"

        assert verify_signature(payload, "invalid_signature", secret) is False

    def test_verify_wrong_secret(self):
        """Wrong secret returns False."""
        payload = '{"event": "extraction.completed"}'
        secret = "whsec_correct_secret"
        wrong_secret = "whsec_wrong_secret"
        signature = compute_signature(payload, secret)

        assert verify_signature(payload, signature, wrong_secret) is False

    def test_verify_with_sha256_prefix(self):
        """Signature with sha256= prefix is handled."""
        payload = '{"event": "test"}'
        secret = "whsec_test"
        signature = compute_signature(payload, secret)

        # compute_signature returns with sha256= prefix
        assert signature.startswith("sha256=")
        assert verify_signature(payload, signature, secret) is True

    def test_verify_without_sha256_prefix(self):
        """Signature without sha256= prefix is handled."""
        payload = '{"event": "test"}'
        secret = "whsec_test"
        signature = compute_signature(payload, secret)

        # Remove prefix
        raw_signature = signature.replace("sha256=", "")
        assert verify_signature(payload, raw_signature, secret) is True

    def test_verify_bytes_payload(self):
        """Bytes payload is handled correctly."""
        payload = b'{"event": "test"}'
        secret = "whsec_test"
        signature = compute_signature(payload, secret)

        assert verify_signature(payload, signature, secret) is True

    def test_compute_signature_format(self):
        """compute_signature returns correct format."""
        payload = '{"test": true}'
        secret = "secret123"
        signature = compute_signature(payload, secret)

        assert signature.startswith("sha256=")
        assert len(signature) == 71  # "sha256=" (7) + 64 hex chars

    def test_signature_is_deterministic(self):
        """Same input always produces same signature."""
        payload = '{"event": "test"}'
        secret = "whsec_test"

        sig1 = compute_signature(payload, secret)
        sig2 = compute_signature(payload, secret)

        assert sig1 == sig2

    def test_different_payloads_different_signatures(self):
        """Different payloads produce different signatures."""
        secret = "whsec_test"

        sig1 = compute_signature('{"event": "a"}', secret)
        sig2 = compute_signature('{"event": "b"}', secret)

        assert sig1 != sig2
