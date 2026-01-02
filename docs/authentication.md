# Authentication

## Overview

Structurify uses API keys for authentication. API keys are managed by your organization administrator.

## Obtaining an API Key

1. Contact your Structurify administrator or support
2. Request API access for your use case
3. Your administrator will generate an API key for your organization
4. Store the API key securely - it will only be shown once

## Using API Keys

Include the API key in every request using one of these methods:

### Authorization Header (Recommended)

```
Authorization: Bearer sk_live_your_api_key
```

### X-API-Key Header

```
X-API-Key: sk_live_your_api_key
```

## API Key Format

API keys follow this format:

```
sk_live_<32_random_characters>
```

## Security Best Practices

1. Never commit API keys to version control
2. Use environment variables to store keys
3. Rotate keys periodically
4. Use separate keys for development and production
5. Restrict key permissions based on use case

### Environment Variables

Python:

```python
import os
from structurify import Structurify

client = Structurify(api_key=os.environ['STRUCTURIFY_API_KEY'])
```

Node.js:

```typescript
import { Structurify } from '@structurify/sdk';

const client = new Structurify({
  apiKey: process.env.STRUCTURIFY_API_KEY!,
});
```

Shell:

```bash
export STRUCTURIFY_API_KEY=sk_live_your_api_key
```

## Rate Limits

Each API key has associated rate limits:

- Requests per minute (default: 60)
- Requests per day (default: 10,000)

Rate limit headers in responses:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |

When rate limited, you'll receive a 429 response with a `Retry-After` header.

## Credits

API usage consumes credits from your organization's balance:

- 1 credit = 1 document extraction

Check your credit balance in the Structurify web dashboard.

## Revoking API Keys

To revoke an API key, contact your organization administrator. Revoked keys immediately stop working.

---

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
