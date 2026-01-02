"""Tests for resource handlers."""

import pytest
import responses
from structurify import Structurify


class TestTemplatesResource:
    """Test templates resource."""

    @responses.activate
    def test_list_templates(self):
        """List templates returns template list."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/project-templates",
            json={
                "templates": [
                    {"id": "tpl_invoice", "name": "Invoice", "description": "Invoice extraction"},
                    {"id": "tpl_receipt", "name": "Receipt", "description": "Receipt extraction"},
                ]
            },
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.templates.list()

        # list() returns the extracted templates array
        assert len(result) == 2
        assert result[0]["id"] == "tpl_invoice"

    @responses.activate
    def test_get_template(self):
        """Get template by ID."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/project-templates/tpl_invoice",
            json={"id": "tpl_invoice", "name": "Invoice", "columns": []},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.templates.get("tpl_invoice")

        assert result["id"] == "tpl_invoice"


class TestProjectsResource:
    """Test projects resource."""

    @responses.activate
    def test_list_projects(self):
        """List projects returns project list."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects",
            json={
                "projects": [
                    {"id": "proj_1", "name": "Test Project"},
                ]
            },
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.projects.list()

        # list() returns the extracted projects array
        assert len(result) == 1
        assert result[0]["id"] == "proj_1"

    @responses.activate
    def test_create_project(self):
        """Create project with template."""
        responses.add(
            responses.POST,
            "https://app.structurify.ai/api/projects",
            json={"id": "proj_new", "name": "My Project"},
            status=201
        )

        client = Structurify(api_key="sk_test_123")
        result = client.projects.create(name="My Project", template_id="tpl_invoice")

        assert result["id"] == "proj_new"
        assert result["name"] == "My Project"

    @responses.activate
    def test_get_project(self):
        """Get project by ID."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/projects/proj_123",
            json={"id": "proj_123", "name": "Test", "columns": [], "documents": []},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.projects.get("proj_123")

        assert result["id"] == "proj_123"

    @responses.activate
    def test_delete_project(self):
        """Delete project by ID."""
        responses.add(
            responses.DELETE,
            "https://app.structurify.ai/api/projects/proj_123",
            json={"success": True},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.projects.delete("proj_123")

        assert result["success"] is True


class TestExtractionResource:
    """Test extraction resource."""

    @responses.activate
    def test_run_extraction(self):
        """Run extraction job."""
        responses.add(
            responses.POST,
            "https://app.structurify.ai/api/extraction-jobs",
            json={"id": "job_123", "status": "PROCESSING"},
            status=201
        )

        client = Structurify(api_key="sk_test_123")
        result = client.extraction.run(project_id="proj_123")

        assert result["id"] == "job_123"
        assert result["status"] == "PROCESSING"

    @responses.activate
    def test_get_extraction(self):
        """Get extraction job status."""
        responses.add(
            responses.GET,
            "https://app.structurify.ai/api/extraction-jobs/job_123",
            json={"id": "job_123", "status": "COMPLETED", "completedTasks": 10},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.extraction.get("job_123")

        assert result["status"] == "COMPLETED"

    @responses.activate
    def test_cancel_extraction(self):
        """Cancel extraction job."""
        # cancel() uses DELETE method
        responses.add(
            responses.DELETE,
            "https://app.structurify.ai/api/extraction-jobs/job_123",
            json={"success": True, "message": "Job cancelled"},
            status=200
        )

        client = Structurify(api_key="sk_test_123")
        result = client.extraction.cancel("job_123")

        assert result["success"] is True


class TestExportsResource:
    """Test exports resource."""

    @responses.activate
    def test_create_export(self):
        """Create export."""
        responses.add(
            responses.POST,
            "https://app.structurify.ai/api/exports",
            json={"export": {"id": "exp_123", "format": "csv"}},
            status=201
        )

        client = Structurify(api_key="sk_test_123")
        result = client.exports.create(project_id="proj_123", format="csv")

        assert result["export"]["id"] == "exp_123"
        assert result["export"]["format"] == "csv"
