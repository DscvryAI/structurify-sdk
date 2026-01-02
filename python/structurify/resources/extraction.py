"""
Extraction Resource

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

import time
from typing import TYPE_CHECKING, Dict, Any, Optional

if TYPE_CHECKING:
    from structurify.client import Structurify


class ExtractionResource:
    """
    Resource for managing extraction jobs.

    Extraction jobs process documents and extract structured data
    based on the project's column definitions.
    """

    def __init__(self, client: "Structurify"):
        self._client = client

    def run(self, project_id: str) -> Dict[str, Any]:
        """
        Start an extraction job for a project.

        This extracts all columns for all documents in the project.
        Consumes 1 credit per document extracted.

        Args:
            project_id: The project ID

        Returns:
            Extraction job details including status and progress.

        Raises:
            InsufficientCreditsError: If not enough credits
            NotFoundError: If project not found

        Example:
            job = client.extraction.run(project_id="proj_xxx")
            print(f"Job {job['id']} started with {job['totalTasks']} tasks")
        """
        response = self._client.post(
            "/extraction-jobs",
            json={"projectId": project_id},
        )
        return response.get("job", response)

    def get(self, job_id: str) -> Dict[str, Any]:
        """
        Get extraction job status.

        Args:
            job_id: The job ID

        Returns:
            Job status including progress percentage.
        """
        response = self._client.get(f"/extraction-jobs/{job_id}")
        return response.get("job", response)

    def cancel(self, job_id: str) -> Dict[str, Any]:
        """
        Cancel an extraction job.

        Args:
            job_id: The job ID

        Returns:
            Cancellation confirmation.
        """
        return self._client.delete(f"/extraction-jobs/{job_id}")

    def wait_for_completion(
        self,
        job_id: str,
        timeout: int = 300,
        poll_interval: float = 2.0,
    ) -> Dict[str, Any]:
        """
        Wait for an extraction job to complete.

        Polls the job status until completion or timeout.

        Args:
            job_id: The job ID
            timeout: Maximum wait time in seconds (default 300)
            poll_interval: Polling interval in seconds (default 2)

        Returns:
            Completed job details.

        Raises:
            TimeoutError: If job does not complete within timeout
            StructurifyError: If job fails

        Example:
            job = client.extraction.run(project_id="proj_xxx")
            completed = client.extraction.wait_for_completion(job["id"])
            print(f"Completed: {completed['completedTasks']}/{completed['totalTasks']}")
        """
        start_time = time.time()
        terminal_states = {"done", "error", "cancelled"}

        while True:
            job = self.get(job_id)
            status = job.get("status", "")

            if status in terminal_states:
                return job

            elapsed = time.time() - start_time
            if elapsed >= timeout:
                raise TimeoutError(
                    f"Job {job_id} did not complete within {timeout} seconds. "
                    f"Current status: {status}, progress: {job.get('progress', 0)}%"
                )

            time.sleep(poll_interval)

    def list(self, project_id: str) -> Dict[str, Any]:
        """
        List extraction jobs for a project.

        Args:
            project_id: The project ID

        Returns:
            List of recent extraction jobs.
        """
        return self._client.get("/extraction-jobs", params={"projectId": project_id})
