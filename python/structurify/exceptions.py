"""
Structurify SDK Exceptions

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

from typing import Optional, Dict, Any


class StructurifyError(Exception):
    """Base exception for all Structurify SDK errors."""

    def __init__(
        self,
        message: str,
        code: Optional[str] = None,
        status_code: Optional[int] = None,
        response: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.response = response

    def __str__(self) -> str:
        if self.code:
            return f"[{self.code}] {self.message}"
        return self.message


class AuthenticationError(StructurifyError):
    """Raised when authentication fails (invalid or missing API key)."""

    def __init__(self, message: str = "Authentication failed", **kwargs: Any):
        super().__init__(message, code="AUTH_ERROR", status_code=401, **kwargs)


class RateLimitError(StructurifyError):
    """Raised when rate limit is exceeded."""

    def __init__(
        self,
        message: str = "Rate limit exceeded",
        retry_after: Optional[int] = None,
        **kwargs: Any,
    ):
        super().__init__(message, code="RATE_LIMIT", status_code=429, **kwargs)
        self.retry_after = retry_after


class NotFoundError(StructurifyError):
    """Raised when a requested resource is not found."""

    def __init__(self, message: str = "Resource not found", **kwargs: Any):
        super().__init__(message, code="NOT_FOUND", status_code=404, **kwargs)


class ValidationError(StructurifyError):
    """Raised when request validation fails."""

    def __init__(self, message: str = "Validation error", **kwargs: Any):
        super().__init__(message, code="VALIDATION_ERROR", status_code=400, **kwargs)


class InsufficientCreditsError(StructurifyError):
    """Raised when the organization does not have enough credits."""

    def __init__(self, message: str = "Insufficient credits", **kwargs: Any):
        super().__init__(message, code="INSUFFICIENT_CREDITS", status_code=402, **kwargs)


class ServerError(StructurifyError):
    """Raised when a server error occurs."""

    def __init__(self, message: str = "Server error", **kwargs: Any):
        super().__init__(message, code="SERVER_ERROR", status_code=500, **kwargs)
