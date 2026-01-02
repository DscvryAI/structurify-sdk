"""
Structurify Client

Main client class for the Structurify SDK.

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

import time
from typing import Optional, Dict, Any
import requests

from structurify.exceptions import (
    StructurifyError,
    AuthenticationError,
    RateLimitError,
    NotFoundError,
    ValidationError,
    InsufficientCreditsError,
    ServerError,
)
from structurify.resources.templates import TemplatesResource
from structurify.resources.projects import ProjectsResource
from structurify.resources.documents import DocumentsResource
from structurify.resources.extraction import ExtractionResource
from structurify.resources.exports import ExportsResource


class Structurify:
    """
    Structurify API client.

    Example:
        client = Structurify(api_key="sk_live_your_api_key")
        templates = client.templates.list()
        project = client.projects.create(name="My Project", template_id="tpl_invoice")
    """

    DEFAULT_BASE_URL = "https://app.structurify.ai/api"
    DEFAULT_TIMEOUT = 30
    MAX_RETRIES = 3
    RETRY_DELAY = 1.0

    def __init__(
        self,
        api_key: str,
        base_url: Optional[str] = None,
        timeout: Optional[int] = None,
        max_retries: Optional[int] = None,
    ):
        """
        Initialize the Structurify client.

        Args:
            api_key: Your Structurify API key (sk_live_xxx format)
            base_url: Optional custom API base URL
            timeout: Request timeout in seconds (default 30)
            max_retries: Maximum number of retries for failed requests (default 3)
        """
        if not api_key:
            raise ValueError("API key is required")

        self._api_key = api_key
        self._base_url = (base_url or self.DEFAULT_BASE_URL).rstrip("/")
        self._timeout = timeout or self.DEFAULT_TIMEOUT
        self._max_retries = max_retries if max_retries is not None else self.MAX_RETRIES

        self._session = requests.Session()
        self._session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "structurify-python/1.0.0",
        })

        # Initialize resource handlers
        self.templates = TemplatesResource(self)
        self.projects = ProjectsResource(self)
        self.documents = DocumentsResource(self)
        self.extraction = ExtractionResource(self)
        self.exports = ExportsResource(self)

    def _request(
        self,
        method: str,
        path: str,
        params: Optional[Dict[str, Any]] = None,
        json: Optional[Dict[str, Any]] = None,
        data: Optional[Any] = None,
        files: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> Dict[str, Any]:
        """
        Make an HTTP request to the API.

        Args:
            method: HTTP method (GET, POST, PUT, DELETE)
            path: API path (e.g., "/projects")
            params: Query parameters
            json: JSON body
            data: Form data
            files: File uploads
            headers: Additional headers

        Returns:
            Response JSON as dictionary

        Raises:
            StructurifyError: On API errors
        """
        url = f"{self._base_url}{path}"

        request_headers = dict(self._session.headers)
        if headers:
            request_headers.update(headers)

        # Remove Content-Type for file uploads
        if files:
            request_headers.pop("Content-Type", None)

        last_error: Optional[Exception] = None

        for attempt in range(self._max_retries + 1):
            try:
                response = self._session.request(
                    method=method,
                    url=url,
                    params=params,
                    json=json,
                    data=data,
                    files=files,
                    headers=request_headers,
                    timeout=self._timeout,
                )

                return self._handle_response(response)

            except RateLimitError as e:
                last_error = e
                if attempt < self._max_retries:
                    retry_after = e.retry_after or (self.RETRY_DELAY * (2 ** attempt))
                    time.sleep(retry_after)
                    continue
                raise

            except (requests.ConnectionError, requests.Timeout) as e:
                last_error = e
                if attempt < self._max_retries:
                    time.sleep(self.RETRY_DELAY * (2 ** attempt))
                    continue
                raise StructurifyError(f"Connection error: {str(e)}")

        raise last_error or StructurifyError("Request failed")

    def _handle_response(self, response: requests.Response) -> Dict[str, Any]:
        """Handle API response and raise appropriate exceptions."""
        try:
            data = response.json()
        except ValueError:
            data = {"error": "InvalidResponse", "message": response.text}

        if response.status_code == 200 or response.status_code == 201:
            return data

        error_code = data.get("error", "Unknown")
        error_message = data.get("message", "An error occurred")

        if response.status_code == 401:
            raise AuthenticationError(error_message, response=data)

        if response.status_code == 402:
            raise InsufficientCreditsError(error_message, response=data)

        if response.status_code == 404:
            raise NotFoundError(error_message, response=data)

        if response.status_code == 429:
            retry_after = response.headers.get("Retry-After")
            raise RateLimitError(
                error_message,
                retry_after=int(retry_after) if retry_after else None,
                response=data,
            )

        if response.status_code == 400:
            raise ValidationError(error_message, response=data)

        if response.status_code >= 500:
            raise ServerError(error_message, response=data)

        raise StructurifyError(
            error_message,
            code=error_code,
            status_code=response.status_code,
            response=data,
        )

    def get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Make a GET request."""
        return self._request("GET", path, params=params)

    def post(
        self,
        path: str,
        json: Optional[Dict[str, Any]] = None,
        data: Optional[Any] = None,
        files: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Make a POST request."""
        return self._request("POST", path, json=json, data=data, files=files)

    def put(self, path: str, json: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Make a PUT request."""
        return self._request("PUT", path, json=json)

    def delete(self, path: str) -> Dict[str, Any]:
        """Make a DELETE request."""
        return self._request("DELETE", path)
