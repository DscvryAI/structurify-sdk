# Structurify API Reference

Base URL: `https://app.structurify.ai/api`

## Authentication

All API requests require authentication via API key.

```
Authorization: Bearer sk_live_your_api_key
```

Or:

```
X-API-Key: sk_live_your_api_key
```

## Rate Limits

Default limits (may vary by organization):

- 60 requests per minute
- 10,000 requests per day

Rate limit headers:

- `X-RateLimit-Limit`: Request limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp (Unix)

## Endpoints

### Templates

#### List Project Templates

```
GET /project-templates
```

Returns available project templates with their column definitions.

Response:

```json
{
  "success": true,
  "templates": [
    {
      "id": "tpl_invoice",
      "name": "Invoice Processing",
      "description": "Extract data from invoices",
      "category": "finance",
      "columns": [...]
    }
  ]
}
```

#### List Column Templates

```
GET /templates
```

Returns available column templates.

### Projects

#### List Projects

```
GET /projects
```

Response:

```json
{
  "success": true,
  "projects": [
    {
      "id": "proj_abc123",
      "name": "Q1 Invoices",
      "templateId": "tpl_invoice",
      "documentCount": 25,
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-02T00:00:00Z"
    }
  ]
}
```

#### Create Project

```
POST /projects
```

Request:

```json
{
  "name": "Q1 Invoices",
  "templateId": "tpl_invoice"
}
```

The `templateId` field is required. Projects must be created from templates.

Response:

```json
{
  "success": true,
  "project": {
    "id": "proj_abc123",
    "name": "Q1 Invoices",
    "templateId": "tpl_invoice",
    "createdAt": "2026-01-02T00:00:00Z"
  }
}
```

#### Get Project

```
GET /projects/{projectId}
```

Response:

```json
{
  "success": true,
  "project": {...},
  "columns": [...],
  "documents": [...]
}
```

#### Delete Project

```
DELETE /projects/{projectId}
```

Deletes the project and all associated documents.

### Documents

#### Upload Document

```
POST /documents
```

Option 1: JSON with base64 content

```json
{
  "projectId": "proj_abc123",
  "fileName": "invoice.pdf",
  "content": "base64_encoded_content",
  "mimeType": "application/pdf"
}
```

Option 2: Multipart form data

```
Content-Type: multipart/form-data

projectId: proj_abc123
file: (binary)
name: invoice.pdf (optional)
```

Response:

```json
{
  "success": true,
  "document": {
    "id": "doc_xyz789",
    "name": "invoice.pdf",
    "mimeType": "application/pdf",
    "size": 102400,
    "status": "pending",
    "createdAt": "2026-01-02T00:00:00Z"
  }
}
```

#### Get Document

```
GET /documents/{documentId}
```

#### Get Document Content

```
GET /documents/{documentId}/content
```

Response:

```json
{
  "success": true,
  "content": "base64_encoded_content",
  "mimeType": "application/pdf"
}
```

#### Delete Document

```
DELETE /documents/{documentId}
```

### Extraction Jobs

#### Create Extraction Job

```
POST /extraction-jobs
```

Request:

```json
{
  "projectId": "proj_abc123"
}
```

Creates an extraction job for all documents in the project.
Consumes 1 credit per document extracted.

Response:

```json
{
  "success": true,
  "job": {
    "id": "job_def456",
    "projectId": "proj_abc123",
    "status": "processing",
    "totalTasks": 50,
    "completedTasks": 0,
    "failedTasks": 0,
    "progress": 0,
    "mode": "async",
    "createdAt": "2026-01-02T00:00:00Z"
  }
}
```

#### Get Extraction Job

```
GET /extraction-jobs/{jobId}
```

Response:

```json
{
  "success": true,
  "job": {
    "id": "job_def456",
    "status": "done",
    "progress": 100,
    "completedTasks": 48,
    "failedTasks": 2,
    "completedAt": "2026-01-02T00:05:00Z"
  }
}
```

Job statuses:
- `pending` - Job queued
- `processing` - Extraction in progress
- `done` - Extraction complete
- `error` - Job failed
- `cancelled` - Job cancelled

#### Cancel Extraction Job

```
DELETE /extraction-jobs/{jobId}
```

### Exports

#### Create Export

```
POST /exports
```

Request:

```json
{
  "projectId": "proj_abc123",
  "format": "csv",
  "documentIds": ["doc_xyz789"] // Optional, defaults to all
}
```

Response (small export, data inline):

```json
{
  "success": true,
  "export": {
    "id": "exp_ghi012",
    "projectId": "proj_abc123",
    "format": "csv",
    "status": "ready"
  },
  "data": "Document,Invoice Number,Amount\n..."
}
```

Response (large export):

```json
{
  "success": true,
  "export": {...},
  "downloadUrl": "/exports/exp_ghi012/download"
}
```

#### Download Export

```
GET /exports/{exportId}/download
```

Returns the export file directly (CSV or JSON).

## Error Responses

All errors follow this format:

```json
{
  "error": "ErrorCode",
  "message": "Human-readable description"
}
```

Common error codes:

| Code | Status | Description |
|------|--------|-------------|
| `Unauthorized` | 401 | Invalid or missing API key |
| `InsufficientCredits` | 402 | Not enough credits |
| `NotFound` | 404 | Resource not found |
| `RateLimited` | 429 | Rate limit exceeded |
| `ValidationError` | 400 | Invalid request data |

## Webhooks

Configure webhooks to receive notifications when events occur.

Webhook payload:

```json
{
  "event": "extraction.completed",
  "timestamp": "2026-01-02T10:30:00Z",
  "data": {
    "job_id": "job_abc123",
    "project_id": "proj_xyz789",
    "status": "done",
    "total_tasks": 50,
    "completed_tasks": 48,
    "failed_tasks": 2
  },
  "signature": "sha256=..."
}
```

Webhook events:
- `extraction.completed` - Extraction job finished
- `extraction.failed` - Extraction job failed
- `export.ready` - Large export ready for download

Verify webhook signatures using HMAC-SHA256:

```python
import hmac
import hashlib

expected = hmac.new(
    secret.encode(),
    payload.encode(),
    hashlib.sha256
).hexdigest()

is_valid = hmac.compare_digest(f"sha256={expected}", signature)
```

---

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
