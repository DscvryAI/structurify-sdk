"""
Exports Resource

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

from typing import TYPE_CHECKING, Dict, Any, Optional, List, Union

if TYPE_CHECKING:
    from structurify.client import Structurify


class ExportsResource:
    """
    Resource for exporting extracted data.

    Export project data as CSV or JSON format.
    """

    def __init__(self, client: "Structurify"):
        self._client = client

    def create(
        self,
        project_id: str,
        format: str = "csv",
        document_ids: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Create an export.

        Args:
            project_id: The project ID
            format: Export format ("csv" or "json")
            document_ids: Optional list of document IDs to export (default all)

        Returns:
            Export details. If the export is small, includes inline "data".
            If large, includes "downloadUrl" for separate download.

        Example:
            export = client.exports.create(
                project_id="proj_xxx",
                format="csv"
            )

            if "data" in export:
                # Small export - data included inline
                print(export["data"])
            else:
                # Large export - download separately
                data = client.exports.download(export["export"]["id"])
        """
        payload: Dict[str, Any] = {
            "projectId": project_id,
            "format": format,
        }
        if document_ids:
            payload["documentIds"] = document_ids

        return self._client.post("/exports", json=payload)

    def get(self, export_id: str) -> Dict[str, Any]:
        """
        Get export status.

        Args:
            export_id: The export ID

        Returns:
            Export status and details.
        """
        response = self._client.get(f"/exports/{export_id}")
        return response.get("export", response)

    def download(self, export_id: str) -> Union[str, Dict[str, Any]]:
        """
        Download export data.

        Args:
            export_id: The export ID

        Returns:
            Export data (string for CSV, dict for JSON).

        Example:
            export = client.exports.create(project_id="proj_xxx", format="csv")
            export_id = export.get("export", {}).get("id") or export.get("id")

            if export_id:
                csv_data = client.exports.download(export_id)
                with open("export.csv", "w") as f:
                    f.write(csv_data)
        """
        response = self._client.get(f"/exports/{export_id}/download")

        # Response might be raw data or JSON wrapper
        if isinstance(response, dict) and "data" in response:
            return response["data"]
        return response

    def list(self, project_id: str) -> List[Dict[str, Any]]:
        """
        List exports for a project.

        Args:
            project_id: The project ID

        Returns:
            List of exports.
        """
        response = self._client.get("/exports", params={"projectId": project_id})
        return response.get("exports", [])

    def delete(self, export_id: str) -> Dict[str, Any]:
        """
        Delete an export.

        Args:
            export_id: The export ID

        Returns:
            Deletion confirmation.
        """
        return self._client.delete(f"/exports/{export_id}")
