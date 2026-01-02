# Structurify SDK

[![npm version](https://img.shields.io/npm/v/@structurify/sdk.svg)](https://www.npmjs.com/package/@structurify/sdk)
[![PyPI version](https://img.shields.io/pypi/v/structurify.svg)](https://pypi.org/project/structurify/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/structurify/structurify-sdk/blob/main/examples/structurify_quickstart.ipynb)

Official SDKs for the [Structurify](https://structurify.ai) document extraction API.

**Try it out:** [Open the interactive Colab notebook](https://colab.research.google.com/github/structurify/structurify-sdk/blob/main/examples/structurify_quickstart.ipynb) to get started in minutes!

## Document Type Notebooks

We provide **169 ready-to-use Colab notebooks** for specific document types:

| Category | Examples |
|----------|----------|
| **Financial** | [Invoice](examples/notebooks/invoice-processing.ipynb), [Bank Statement](examples/notebooks/bank-statement.ipynb), [Receipt](examples/notebooks/receipt.ipynb), [W-2](examples/notebooks/irs-form-w-2.ipynb) |
| **Legal** | [Contract](examples/notebooks/commercial-contract.ipynb), [NDA](examples/notebooks/non-disclosure-agreement-nda.ipynb), [Power of Attorney](examples/notebooks/power-of-attorney.ipynb) |
| **Healthcare** | [Medical Record](examples/notebooks/medical-record.ipynb), [Insurance Claim](examples/notebooks/medical-insurance-claim.ipynb), [Lab Report](examples/notebooks/laboratory-test-report.ipynb) |
| **Real Estate** | [Lease Agreement](examples/notebooks/lease-agreement.ipynb), [Deed](examples/notebooks/deed.ipynb), [Appraisal](examples/notebooks/uniform-residential-appraisal-report.ipynb) |
| **HR** | [Resume](examples/notebooks/resume-cv.ipynb), [Offer Letter](examples/notebooks/offer-letter.ipynb), [I-9](examples/notebooks/i-9-employment-eligibility.ipynb) |

**[Browse all 169 notebooks →](examples/NOTEBOOKS.md)** | **[Try online at structurify.ai/extract →](https://structurify.ai/extract)**

## Node.js/TypeScript Examples

We also provide **169 TypeScript examples** for Node.js developers:

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/structurify/structurify-sdk/tree/main/examples/codesandbox)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/structurify/structurify-sdk/tree/main/examples/codesandbox)

```bash
# Quick start
npm install @structurify/sdk
export STRUCTURIFY_API_KEY=sk_live_your_api_key
npx ts-node examples/nodejs/invoice-processing.ts ./invoice.pdf
```

**[Browse all 169 TypeScript examples →](examples/NODEJS_EXAMPLES.md)**

## Overview

Structurify is an AI-powered document extraction platform. These SDKs provide programmatic access to:

- Project Templates: Pre-configured extraction schemas for invoices, receipts, contracts, and more
- Document Upload: Upload PDFs, images, and office documents
- AI Extraction: Extract structured data using AI
- Data Export: Export results as CSV or JSON

## Available SDKs

| Language | Package | Install |
|----------|---------|---------|
| Python | [`structurify`](https://pypi.org/project/structurify/) | `pip install structurify` |
| Node.js | [`@structurify/sdk`](https://www.npmjs.com/package/@structurify/sdk) | `npm install @structurify/sdk` |
| REST API | [OpenAPI Spec](openapi/structurify-api.yaml) | See cURL examples below |

## Quick Start

### Python

```bash
pip install structurify
```

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
    project_id=project.id,
    file_path="invoice.pdf"
)

# Run extraction
job = client.extraction.run(project_id=project.id)
job = client.extraction.wait_for_completion(job.id)

# Export results
data = client.exports.download(
    client.exports.create(project_id=project.id, format="csv").id
)
```

### Node.js

```bash
npm install @structurify/sdk
```

```typescript
import { Structurify } from '@structurify/sdk';
import fs from 'fs';

const client = new Structurify({ apiKey: 'sk_live_your_api_key' });

// List available project templates
const templates = await client.templates.list();

// Create a project from template
const project = await client.projects.create({
  name: 'Q1 Invoices',
  templateId: 'tpl_invoice'
});

// Upload a document
const doc = await client.documents.upload({
  projectId: project.id,
  file: fs.createReadStream('invoice.pdf'),
  name: 'invoice.pdf'
});

// Run extraction
const job = await client.extraction.run({ projectId: project.id });
const completedJob = await client.extraction.waitForCompletion(job.id);

// Export results
const exportResult = await client.exports.create({
  projectId: project.id,
  format: 'csv'
});
```

### cURL

```bash
# List templates
curl -H "Authorization: Bearer sk_live_your_api_key" \
  https://app.structurify.ai/api/project-templates

# Create project
curl -X POST -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"name": "Q1 Invoices", "templateId": "tpl_invoice"}' \
  https://app.structurify.ai/api/projects

# Upload document
curl -X POST -H "Authorization: Bearer sk_live_your_api_key" \
  -F "projectId=proj_xxx" \
  -F "file=@invoice.pdf" \
  https://app.structurify.ai/api/documents

# Run extraction
curl -X POST -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"projectId": "proj_xxx"}' \
  https://app.structurify.ai/api/extraction-jobs

# Export data
curl -X POST -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"projectId": "proj_xxx", "format": "csv"}' \
  https://app.structurify.ai/api/exports
```

## Authentication

API keys are required for all requests. Contact your Structurify administrator to request API access.

```
Authorization: Bearer sk_live_your_api_key
```

Or use the `X-API-Key` header:

```
X-API-Key: sk_live_your_api_key
```

## API Reference

See the full API Reference in the docs folder for detailed endpoint documentation.

## Webhooks

Structurify can send webhook notifications when extractions complete.

Python - Verify webhook signature:

```python
from structurify.webhooks import verify_signature

is_valid = verify_signature(
    payload=request.body,
    signature=request.headers['X-Structurify-Signature'],
    secret='your_webhook_secret'
)
```

Node.js - Verify webhook signature:

```typescript
import { verifyWebhookSignature } from '@structurify/sdk';

const isValid = verifyWebhookSignature({
  payload: req.body,
  signature: req.headers['x-structurify-signature'],
  secret: 'your_webhook_secret'
});
```

## Rate Limits

Default rate limits (can be adjusted by admin):

- 60 requests per minute
- 10,000 requests per day

Rate limit headers are included in responses:

- `X-RateLimit-Limit`: Request limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp

## Credits

API usage consumes credits from your organization's balance. One credit equals one document extraction.

Check your balance via the web dashboard or API.

## Support

- **Website:** [structurify.ai](https://structurify.ai)
- **Documentation:** [docs.structurify.ai](https://docs.structurify.ai)
- **All Templates:** [structurify.ai/extract](https://structurify.ai/extract)
- **Email:** support@structurify.ai

## License

MIT License - Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED

See LICENSE file for details.
