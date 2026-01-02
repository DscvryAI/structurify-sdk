"""Tests for SDK exceptions."""

import pytest
from structurify.exceptions import (
    StructurifyError,
    AuthenticationError,
    RateLimitError,
    NotFoundError,
    ValidationError,
    InsufficientCreditsError,
    ServerError,
)


class TestStructurifyError:
    """Test base StructurifyError."""

    def test_basic_message(self):
        """Error has message attribute."""
        error = StructurifyError("Something went wrong")
        assert error.message == "Something went wrong"
        assert str(error) == "Something went wrong"

    def test_with_code(self):
        """Error with code formats correctly."""
        error = StructurifyError("Test error", code="TEST_CODE")
        assert error.code == "TEST_CODE"
        assert str(error) == "[TEST_CODE] Test error"

    def test_with_status_code(self):
        """Error stores status code."""
        error = StructurifyError("Test", status_code=418)
        assert error.status_code == 418

    def test_with_response(self):
        """Error stores response data."""
        response = {"error": "TEST", "details": {"field": "name"}}
        error = StructurifyError("Test", response=response)
        assert error.response == response


class TestAuthenticationError:
    """Test AuthenticationError."""

    def test_default_message(self):
        """AuthenticationError has default message."""
        error = AuthenticationError()
        assert error.message == "Authentication failed"
        assert error.code == "AUTH_ERROR"
        assert error.status_code == 401

    def test_custom_message(self):
        """AuthenticationError accepts custom message."""
        error = AuthenticationError("Invalid API key format")
        assert error.message == "Invalid API key format"


class TestRateLimitError:
    """Test RateLimitError."""

    def test_default_message(self):
        """RateLimitError has default message."""
        error = RateLimitError()
        assert error.message == "Rate limit exceeded"
        assert error.code == "RATE_LIMIT"
        assert error.status_code == 429
        assert error.retry_after is None

    def test_with_retry_after(self):
        """RateLimitError stores retry_after."""
        error = RateLimitError(retry_after=60)
        assert error.retry_after == 60


class TestNotFoundError:
    """Test NotFoundError."""

    def test_default_message(self):
        """NotFoundError has default message."""
        error = NotFoundError()
        assert error.message == "Resource not found"
        assert error.code == "NOT_FOUND"
        assert error.status_code == 404


class TestValidationError:
    """Test ValidationError."""

    def test_default_message(self):
        """ValidationError has default message."""
        error = ValidationError()
        assert error.message == "Validation error"
        assert error.code == "VALIDATION_ERROR"
        assert error.status_code == 400


class TestInsufficientCreditsError:
    """Test InsufficientCreditsError."""

    def test_default_message(self):
        """InsufficientCreditsError has default message."""
        error = InsufficientCreditsError()
        assert error.message == "Insufficient credits"
        assert error.code == "INSUFFICIENT_CREDITS"
        assert error.status_code == 402


class TestServerError:
    """Test ServerError."""

    def test_default_message(self):
        """ServerError has default message."""
        error = ServerError()
        assert error.message == "Server error"
        assert error.code == "SERVER_ERROR"
        assert error.status_code == 500
