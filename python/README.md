# Structurify Python SDK

Official Python SDK for the Structurify document extraction API.

## Installation

```bash
pip install structurify
```

For async support:

```bash
pip install structurify[async]
```

## Quick Start

```python
from structurify import Structurify

client = Structurify(api_key="sk_live_your_api_key")

# List available project templates
templates = client.templates.list()

# Create a project from template
project = client.projects.create(
    name="Q1 Invoices",
    template_id="tpl_invoice"
)

# Upload a document
doc = client.documents.upload(
    project_id=project["id"],
    file_path="invoice.pdf"
)

# Run extraction
job = client.extraction.run(project_id=project["id"])

# Wait for completion
completed = client.extraction.wait_for_completion(job["id"])
print(f"Extracted {completed['completedTasks']} cells")

# Export results
export = client.exports.create(project_id=project["id"], format="csv")
```

## API Reference

### Client

```python
client = Structurify(
    api_key="sk_live_xxx",     # Required
    base_url="...",            # Optional custom base URL
    timeout=30,                # Request timeout in seconds
    max_retries=3,             # Retry count for failed requests
)
```

### Templates

```python
# List project templates
templates = client.templates.list()

# List column templates
columns = client.templates.list_columns()

# Get specific template
template = client.templates.get("tpl_invoice")
```

### Projects

```python
# List projects
projects = client.projects.list()

# Create project (must use template)
project = client.projects.create(
    name="My Project",
    template_id="tpl_invoice"
)

# Get project with columns and documents
project = client.projects.get("proj_xxx")

# Delete project
client.projects.delete("proj_xxx")
```

### Documents

```python
# Upload from file path
doc = client.documents.upload(
    project_id="proj_xxx",
    file_path="invoice.pdf"
)

# Upload from bytes
doc = client.documents.upload(
    project_id="proj_xxx",
    file_bytes=pdf_bytes,
    name="invoice.pdf"
)

# Get document metadata
doc = client.documents.get("doc_xxx")

# Download document content
content = client.documents.download("doc_xxx")

# Delete document
client.documents.delete("doc_xxx")
```

### Extraction

```python
# Run extraction (consumes credits)
job = client.extraction.run(project_id="proj_xxx")

# Check status
job = client.extraction.get(job["id"])

# Wait for completion
completed = client.extraction.wait_for_completion(
    job["id"],
    timeout=300,        # seconds
    poll_interval=2.0   # seconds
)

# Cancel job
client.extraction.cancel(job["id"])
```

### Exports

```python
# Create export
export = client.exports.create(
    project_id="proj_xxx",
    format="csv"  # or "json"
)

# Download export
data = client.exports.download(export["export"]["id"])

# Save to file
with open("export.csv", "w") as f:
    f.write(data)
```

### Webhooks

```python
from structurify.webhooks import verify_signature

# Verify webhook signature
is_valid = verify_signature(
    payload=request.body,
    signature=request.headers["X-Structurify-Signature"],
    secret="your_webhook_secret"
)
```

## Error Handling

```python
from structurify import (
    Structurify,
    AuthenticationError,
    InsufficientCreditsError,
    NotFoundError,
    RateLimitError,
    ValidationError,
)

client = Structurify(api_key="sk_live_xxx")

try:
    project = client.projects.get("proj_xxx")
except AuthenticationError:
    print("Invalid API key")
except NotFoundError:
    print("Project not found")
except InsufficientCreditsError as e:
    print(f"Not enough credits: {e.message}")
except RateLimitError as e:
    print(f"Rate limited. Retry after: {e.retry_after}s")
except ValidationError as e:
    print(f"Invalid request: {e.message}")
```

## License

MIT License - Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
