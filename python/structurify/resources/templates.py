"""
Templates Resource

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

from typing import TYPE_CHECKING, List, Dict, Any

if TYPE_CHECKING:
    from structurify.client import Structurify


class TemplatesResource:
    """
    Resource for managing project and column templates.

    Templates define the extraction schema for projects.
    """

    def __init__(self, client: "Structurify"):
        self._client = client

    def list(self) -> List[Dict[str, Any]]:
        """
        List all available project templates.

        Returns:
            List of project templates with their column definitions.

        Example:
            templates = client.templates.list()
            for template in templates:
                print(template["name"], template["id"])
        """
        response = self._client.get("/project-templates")
        return response.get("templates", [])

    def list_columns(self) -> List[Dict[str, Any]]:
        """
        List all available column templates.

        Returns:
            List of column templates.

        Example:
            columns = client.templates.list_columns()
            for column in columns:
                print(column["label"], column["format"])
        """
        response = self._client.get("/templates")
        return response.get("templates", [])

    def get(self, template_id: str) -> Dict[str, Any]:
        """
        Get a specific project template by ID.

        Args:
            template_id: The template ID (e.g., "tpl_invoice")

        Returns:
            Template details with columns.

        Raises:
            NotFoundError: If template not found
        """
        response = self._client.get(f"/project-templates/{template_id}")
        return response.get("template", response)
