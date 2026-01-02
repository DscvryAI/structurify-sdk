"""Tests for the Structurify client."""

import pytest
import responses
from structurify import Structurify
from structurify.exceptions import (
    AuthenticationError,
    InsufficientCreditsError,
    NotFoundError,
    RateLimitError,
    ValidationError,
    ServerError,
)


class TestClientInitialization:
    """Test client initialization."""

    def test_init_with_api_key(self):
        """Client initializes with API key."""
        client = Structurify(api_key="sk_test_123")
        assert client._api_key == "sk_test_123"
        assert client._base_url == "https://app.structurify.ai/api"

    def test_init_with_custom_base_url(self):
        """Client accepts custom base URL."""
        client = Structurify(
            api_key="sk_test_123",
            base_url="https://custom.example.com/api/"
        )
        assert client._base_url == "https://custom.example.com/api"

    def test_init_with_custom_timeout(self):
        """Client accepts custom timeout."""
        client = Structurify(api_key="sk_test_123", timeout=60)
        assert client._timeout == 60

    def test_init_with_custom_max_retries(self):
        """Client accepts custom max retries."""
        client = Structurify(api_key="sk_test_123", max_retries=5)
        assert client._max_retries == 5

    def test_init_without_api_key_raises(self):
        """Client raises ValueError without API key."""
        with pytest.raises(ValueError, match="API key is required"):
            Structurify(api_key="")

    def test_init_resources_available(self):
        """Client has all resource handlers."""
        client = Structurify(api_key="sk_test_123")
        assert hasattr(client, "templates")
        assert hasattr(client, "projects")
        assert hasattr(client, "documents")
        assert hasattr(client, "extraction")
        assert hasattr(client, "exports")


class TestClientErrorHandling:
    """Test client error handling."""

    @responses.activate
    def test_401_raises_authentication_error(self):
        """401 response raises AuthenticationError."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects",
            json={"error": "AUTH_ERROR", "message": "Invalid API key"},
            status=401
        )

        client = Structurify(api_key="sk_test_invalid")
        with pytest.raises(AuthenticationError) as exc_info:
            client.get("/projects")

        assert "Invalid API key" in str(exc_info.value)

    @responses.activate
    def test_402_raises_insufficient_credits_error(self):
        """402 response raises InsufficientCreditsError."""
        responses.add(
            responses.POST,
            "https://app.structurify.ai/api/extraction-jobs",
            json={"error": "INSUFFICIENT_CREDITS", "message": "Not enough credits"},
            status=402
        )

        client = Structurify(api_key="sk_test_123")
        with pytest.raises(InsufficientCreditsError):
            client.post("/extraction-jobs", json={"projectId": "proj_123"})

    @responses.activate
    def test_404_raises_not_found_error(self):
        """404 response raises NotFoundError."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects/proj_notfound",
            json={"error": "NOT_FOUND", "message": "Project not found"},
            status=404
        )

        client = Structurify(api_key="sk_test_123")
        with pytest.raises(NotFoundError):
            client.get("/projects/proj_notfound")

    @responses.activate
    def test_429_raises_rate_limit_error(self):
        """429 response raises RateLimitError."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects",
            json={"error": "RATE_LIMIT", "message": "Too many requests"},
            status=429,
            headers={"Retry-After": "30"}
        )

        client = Structurify(api_key="sk_test_123", max_retries=0)
        with pytest.raises(RateLimitError) as exc_info:
            client.get("/projects")

        assert exc_info.value.retry_after == 30

    @responses.activate
    def test_400_raises_validation_error(self):
        """400 response raises ValidationError."""
        responses.add(
            responses.POST,
            "https://app.structurify.ai/api/projects",
            json={"error": "VALIDATION_ERROR", "message": "Name is required"},
            status=400
        )

        client = Structurify(api_key="sk_test_123")
        with pytest.raises(ValidationError):
            client.post("/projects", json={})

    @responses.activate
    def test_500_raises_server_error(self):
        """500 response raises ServerError."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects",
            json={"error": "SERVER_ERROR", "message": "Internal server error"},
            status=500
        )

        client = Structurify(api_key="sk_test_123", max_retries=0)
        with pytest.raises(ServerError):
            client.get("/projects")


class TestClientRequests:
    """Test client HTTP requests."""

    @responses.activate
    def test_get_request(self):
        """GET request works correctly."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects",
            json={"projects": [{"id": "proj_1", "name": "Test"}]},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.get("/projects")

        assert "projects" in result
        assert len(result["projects"]) == 1

    @responses.activate
    def test_post_request(self):
        """POST request works correctly."""
        responses.add(
            responses.POST,
            "https://app.structurify.ai/api/projects",
            json={"id": "proj_new", "name": "New Project"},
            status=201
        )

        client = Structurify(api_key="sk_test_123")
        result = client.post("/projects", json={"name": "New Project"})

        assert result["id"] == "proj_new"

    @responses.activate
    def test_delete_request(self):
        """DELETE request works correctly."""
        responses.add(
            responses.DELETE,
            "https://app.structurify.ai/api/projects/proj_123",
            json={"success": True},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.delete("/projects/proj_123")

        assert result["success"] is True

    @responses.activate
    def test_authorization_header_sent(self):
        """Authorization header is sent with requests."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects",
            json={"projects": []},
            status=200
        )

        client = Structurify(api_key="sk_test_secret_key")
        client.get("/projects")

        assert len(responses.calls) == 1
        assert "Bearer sk_test_secret_key" in responses.calls[0].request.headers["Authorization"]
