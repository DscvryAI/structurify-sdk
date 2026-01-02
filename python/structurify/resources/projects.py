"""
Projects Resource

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

from typing import TYPE_CHECKING, List, Dict, Any, Optional

if TYPE_CHECKING:
    from structurify.client import Structurify


class ProjectsResource:
    """
    Resource for managing projects.

    Projects contain documents and define extraction columns via templates.
    """

    def __init__(self, client: "Structurify"):
        self._client = client

    def list(self) -> List[Dict[str, Any]]:
        """
        List all projects.

        Returns:
            List of projects.

        Example:
            projects = client.projects.list()
            for project in projects:
                print(project["name"], project["id"])
        """
        response = self._client.get("/projects")
        return response.get("projects", [])

    def get(self, project_id: str) -> Dict[str, Any]:
        """
        Get a project by ID with its columns and documents.

        Args:
            project_id: The project ID

        Returns:
            Project details with columns and documents.

        Raises:
            NotFoundError: If project not found
        """
        return self._client.get(f"/projects/{project_id}")

    def create(
        self,
        name: str,
        template_id: str,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Create a new project from a template.

        Projects must be created from templates. The template defines
        which columns will be used for extraction.

        Args:
            name: Project name
            template_id: Template ID to use (required)
            description: Optional project description

        Returns:
            Created project details.

        Raises:
            ValidationError: If template_id is missing

        Example:
            project = client.projects.create(
                name="Q1 Invoices",
                template_id="tpl_invoice"
            )
        """
        payload: Dict[str, Any] = {
            "name": name,
            "templateId": template_id,
        }
        if description:
            payload["description"] = description

        response = self._client.post("/projects", json=payload)
        return response.get("project", response)

    def update(self, project_id: str, name: str) -> Dict[str, Any]:
        """
        Update a project name.

        Args:
            project_id: The project ID
            name: New project name

        Returns:
            Updated project details.
        """
        response = self._client.put(f"/projects/{project_id}", json={"name": name})
        return response.get("project", response)

    def delete(self, project_id: str) -> Dict[str, Any]:
        """
        Delete a project and all its documents.

        Args:
            project_id: The project ID

        Returns:
            Deletion confirmation.

        Warning:
            This action cannot be undone. All documents and extraction
            data will be permanently deleted.
        """
        return self._client.delete(f"/projects/{project_id}")
