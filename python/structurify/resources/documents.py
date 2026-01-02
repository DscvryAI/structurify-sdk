"""
Documents Resource

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

import base64
import os
from typing import TYPE_CHECKING, Dict, Any, Optional, Union, BinaryIO

if TYPE_CHECKING:
    from structurify.client import Structurify


# MIME type mapping
MIME_TYPES = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".tiff": "image/tiff",
    ".tif": "image/tiff",
    ".bmp": "image/bmp",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".odt": "application/vnd.oasis.opendocument.text",
    ".ods": "application/vnd.oasis.opendocument.spreadsheet",
    ".odp": "application/vnd.oasis.opendocument.presentation",
}


def _get_mime_type(filename: str) -> str:
    """Get MIME type from filename extension."""
    ext = os.path.splitext(filename)[1].lower()
    return MIME_TYPES.get(ext, "application/octet-stream")


class DocumentsResource:
    """
    Resource for managing documents.

    Documents are files uploaded to projects for extraction.
    """

    def __init__(self, client: "Structurify"):
        self._client = client

    def upload(
        self,
        project_id: str,
        file_path: Optional[str] = None,
        file_bytes: Optional[bytes] = None,
        file_obj: Optional[BinaryIO] = None,
        name: Optional[str] = None,
        mime_type: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Upload a document to a project.

        Provide one of: file_path, file_bytes, or file_obj.

        Args:
            project_id: The project ID to upload to
            file_path: Path to file on disk
            file_bytes: Raw file bytes
            file_obj: File-like object (must have read() method)
            name: Optional custom document name
            mime_type: Optional MIME type (auto-detected from filename)

        Returns:
            Uploaded document details.

        Raises:
            ValueError: If no file source provided
            ValidationError: If file type not supported

        Example:
            doc = client.documents.upload(
                project_id="proj_xxx",
                file_path="invoice.pdf"
            )

            # Or with bytes
            with open("invoice.pdf", "rb") as f:
                doc = client.documents.upload(
                    project_id="proj_xxx",
                    file_bytes=f.read(),
                    name="invoice.pdf"
                )
        """
        # Determine file content and name
        content: bytes
        filename: str

        if file_path:
            filename = name or os.path.basename(file_path)
            with open(file_path, "rb") as f:
                content = f.read()
        elif file_bytes:
            if not name:
                raise ValueError("name is required when using file_bytes")
            filename = name
            content = file_bytes
        elif file_obj:
            if not name:
                raise ValueError("name is required when using file_obj")
            filename = name
            content = file_obj.read()
        else:
            raise ValueError("One of file_path, file_bytes, or file_obj is required")

        # Determine MIME type
        if not mime_type:
            mime_type = _get_mime_type(filename)

        # Use JSON upload with base64 encoding
        encoded_content = base64.b64encode(content).decode("utf-8")

        response = self._client.post(
            "/documents",
            json={
                "projectId": project_id,
                "fileName": filename,
                "content": encoded_content,
                "mimeType": mime_type,
            },
        )
        return response.get("document", response)

    def upload_multipart(
        self,
        project_id: str,
        file_path: str,
        name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Upload a document using multipart form data.

        Use this for large files when JSON upload is not suitable.

        Args:
            project_id: The project ID to upload to
            file_path: Path to file on disk
            name: Optional custom document name

        Returns:
            Uploaded document details.
        """
        filename = name or os.path.basename(file_path)
        mime_type = _get_mime_type(filename)

        with open(file_path, "rb") as f:
            files = {"file": (filename, f, mime_type)}
            data = {"projectId": project_id}
            if name:
                data["name"] = name

            response = self._client.post("/documents", data=data, files=files)

        return response.get("document", response)

    def get(self, document_id: str) -> Dict[str, Any]:
        """
        Get document metadata.

        Args:
            document_id: The document ID

        Returns:
            Document metadata.
        """
        response = self._client.get(f"/documents/{document_id}")
        return response.get("document", response)

    def get_content(self, document_id: str) -> Dict[str, Any]:
        """
        Get document content as base64.

        Args:
            document_id: The document ID

        Returns:
            Dictionary with "content" (base64) and "mimeType".
        """
        return self._client.get(f"/documents/{document_id}/content")

    def download(self, document_id: str) -> bytes:
        """
        Download document content as bytes.

        Args:
            document_id: The document ID

        Returns:
            Document content as bytes.

        Example:
            content = client.documents.download("doc_xxx")
            with open("downloaded.pdf", "wb") as f:
                f.write(content)
        """
        response = self.get_content(document_id)
        content_b64 = response.get("content", "")
        return base64.b64decode(content_b64)

    def delete(self, document_id: str) -> Dict[str, Any]:
        """
        Delete a document.

        Args:
            document_id: The document ID

        Returns:
            Deletion confirmation.
        """
        return self._client.delete(f"/documents/{document_id}")
