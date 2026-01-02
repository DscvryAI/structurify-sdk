"""
Webhook Utilities

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

import hashlib
import hmac
from typing import Union


def verify_signature(
    payload: Union[str, bytes],
    signature: str,
    secret: str,
) -> bool:
    """
    Verify a webhook signature.

    Structurify signs webhook payloads using HMAC-SHA256.
    The signature is sent in the X-Structurify-Signature header.

    Args:
        payload: The raw request body (string or bytes)
        signature: The signature from X-Structurify-Signature header
        secret: Your webhook secret

    Returns:
        True if signature is valid, False otherwise.

    Example:
        from structurify.webhooks import verify_signature

        @app.post("/webhook")
        def handle_webhook(request):
            payload = request.body
            signature = request.headers.get("X-Structurify-Signature")

            if not verify_signature(payload, signature, "your_secret"):
                return {"error": "Invalid signature"}, 401

            data = request.json()
            if data["event"] == "extraction.completed":
                # Handle extraction completion
                pass
    """
    if isinstance(payload, str):
        payload = payload.encode("utf-8")

    if isinstance(secret, str):
        secret = secret.encode("utf-8")

    # Remove "sha256=" prefix if present
    if signature.startswith("sha256="):
        signature = signature[7:]

    expected = hmac.new(secret, payload, hashlib.sha256).hexdigest()

    return hmac.compare_digest(expected, signature)


def compute_signature(payload: Union[str, bytes], secret: str) -> str:
    """
    Compute HMAC-SHA256 signature for a payload.

    This is primarily useful for testing webhook handlers.

    Args:
        payload: The payload to sign
        secret: Your webhook secret

    Returns:
        Signature string in "sha256=xxx" format.
    """
    if isinstance(payload, str):
        payload = payload.encode("utf-8")

    if isinstance(secret, str):
        secret = secret.encode("utf-8")

    sig = hmac.new(secret, payload, hashlib.sha256).hexdigest()
    return f"sha256={sig}"
