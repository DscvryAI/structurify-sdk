# Structurify Node.js SDK

[![npm version](https://img.shields.io/npm/v/@structurify/sdk.svg)](https://www.npmjs.com/package/@structurify/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

Official Node.js SDK for the [Structurify](https://structurify.ai) document extraction API.

## Installation

```bash
npm install @structurify/sdk
```

## Requirements

- Node.js 18.0.0 or higher
- TypeScript 5.0+ (for TypeScript users)

## Quick Start

```typescript
import { Structurify } from '@structurify/sdk';

const client = new Structurify({ apiKey: 'sk_live_your_api_key' });

// List available project templates
const templates = await client.templates.list();

// Create a project from template
const project = await client.projects.create({
  name: 'Q1 Invoices',
  templateId: 'tpl_invoice',
});

// Upload a document
const doc = await client.documents.uploadFromPath(
  project.id,
  './invoice.pdf'
);

// Run extraction
const job = await client.extraction.run(project.id);

// Wait for completion
const completed = await client.extraction.waitForCompletion(job.id);
console.log(`Extracted ${completed.completedTasks} cells`);

// Export results
const result = await client.exports.create({
  projectId: project.id,
  format: 'csv',
});
```

## API Reference

### Client

```typescript
const client = new Structurify({
  apiKey: 'sk_live_xxx',     // Required
  baseUrl: '...',            // Optional custom base URL
  timeout: 30000,            // Request timeout in ms (default 30000)
  maxRetries: 3,             // Retry count for failed requests
});
```

### Templates

```typescript
// List project templates
const templates = await client.templates.list();

// List column templates
const columns = await client.templates.listColumns();

// Get specific template
const template = await client.templates.get('tpl_invoice');
```

### Projects

```typescript
// List projects
const projects = await client.projects.list();

// Create project (must use template)
const project = await client.projects.create({
  name: 'My Project',
  templateId: 'tpl_invoice',
});

// Get project with columns and documents
const details = await client.projects.get('proj_xxx');

// Delete project
await client.projects.delete('proj_xxx');
```

### Documents

```typescript
import fs from 'fs';

// Upload from file path
const doc = await client.documents.uploadFromPath(
  'proj_xxx',
  './invoice.pdf'
);

// Upload from buffer
const buffer = fs.readFileSync('./invoice.pdf');
const doc = await client.documents.upload({
  projectId: 'proj_xxx',
  file: buffer,
  name: 'invoice.pdf',
});

// Upload from stream
const stream = fs.createReadStream('./invoice.pdf');
const doc = await client.documents.upload({
  projectId: 'proj_xxx',
  file: stream,
  name: 'invoice.pdf',
});

// Get document metadata
const doc = await client.documents.get('doc_xxx');

// Download document content
const content = await client.documents.download('doc_xxx');
fs.writeFileSync('./downloaded.pdf', content);

// Delete document
await client.documents.delete('doc_xxx');
```

### Extraction

```typescript
// Run extraction (consumes credits)
const job = await client.extraction.run('proj_xxx');

// Check status
const status = await client.extraction.get(job.id);

// Wait for completion
const completed = await client.extraction.waitForCompletion(job.id, {
  timeout: 300000,    // 5 minutes
  pollInterval: 2000, // 2 seconds
});

// Cancel job
await client.extraction.cancel(job.id);
```

### Exports

```typescript
// Create export
const result = await client.exports.create({
  projectId: 'proj_xxx',
  format: 'csv', // or 'json'
});

// Download export
const data = await client.exports.download(result.export.id);

// Save to file
fs.writeFileSync('./export.csv', data as string);
```

### Webhooks

```typescript
import { verifyWebhookSignature } from '@structurify/sdk';

// Verify webhook signature
app.post('/webhook', (req, res) => {
  const isValid = verifyWebhookSignature({
    payload: req.body,
    signature: req.headers['x-structurify-signature'] as string,
    secret: 'your_webhook_secret',
  });

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const data = JSON.parse(req.body);
  if (data.event === 'extraction.completed') {
    // Handle extraction completion
  }
});
```

## Error Handling

```typescript
import {
  Structurify,
  AuthenticationError,
  InsufficientCreditsError,
  NotFoundError,
  RateLimitError,
  ValidationError,
} from '@structurify/sdk';

const client = new Structurify({ apiKey: 'sk_live_xxx' });

try {
  const project = await client.projects.get('proj_xxx');
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.log('Project not found');
  } else if (error instanceof InsufficientCreditsError) {
    console.log('Not enough credits');
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after: ${error.retryAfter}s`);
  } else if (error instanceof ValidationError) {
    console.log(`Invalid request: ${error.message}`);
  }
}
```

## License

MIT License - Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
