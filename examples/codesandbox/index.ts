/**
 * Structurify SDK - Interactive Example
 *
 * This example demonstrates the core functionality of the Structurify SDK
 * for extracting structured data from documents using AI.
 *
 * Try it live: https://structurify.ai/extract
 * Documentation: https://docs.structurify.ai
 *
 * @see https://github.com/structurify/structurify-sdk
 */

import { Structurify } from '@structurify/sdk';

// =============================================================================
// CONFIGURATION
// =============================================================================

// Replace with your API key from https://app.structurify.ai
const API_KEY = process.env.STRUCTURIFY_API_KEY || 'sk_live_your_api_key';

// Choose a template for your document type
// See all templates at: https://structurify.ai/extract
const TEMPLATE_ID = 'tpl_invoice'; // invoice, receipt, bank_statement, etc.

// =============================================================================
// MAIN EXAMPLE
// =============================================================================

async function main() {
  console.log('='.repeat(60));
  console.log('Structurify SDK - Document Extraction Example');
  console.log('='.repeat(60));

  // Initialize the client
  const client = new Structurify({ apiKey: API_KEY });

  // -------------------------------------------------------------------------
  // Example 1: List Available Templates
  // -------------------------------------------------------------------------
  console.log('\n1. Available Templates');
  console.log('-'.repeat(40));

  try {
    const templates = await client.templates.list();
    console.log(`Found ${templates.length} templates:\n`);

    // Show first 10 templates
    templates.slice(0, 10).forEach((template) => {
      console.log(`  - ${template.name} (${template.id})`);
    });

    if (templates.length > 10) {
      console.log(`  ... and ${templates.length - 10} more`);
    }
  } catch (error) {
    console.log('  (Requires valid API key to list templates)');
  }

  // -------------------------------------------------------------------------
  // Example 2: Create a Project
  // -------------------------------------------------------------------------
  console.log('\n2. Creating a Project');
  console.log('-'.repeat(40));

  console.log(`
  // Create a project with a specific template
  const project = await client.projects.create({
    name: 'My Extraction Project',
    templateId: '${TEMPLATE_ID}',
  });

  console.log('Project ID:', project.id);
`);

  // -------------------------------------------------------------------------
  // Example 3: Upload a Document
  // -------------------------------------------------------------------------
  console.log('\n3. Uploading a Document');
  console.log('-'.repeat(40));

  console.log(`
  // Upload from file path (Node.js)
  import * as fs from 'fs';

  const fileBuffer = fs.readFileSync('./document.pdf');
  const doc = await client.documents.upload({
    projectId: project.id,
    file: new Blob([fileBuffer]),
    name: 'document.pdf',
  });

  console.log('Document ID:', doc.id);
`);

  // -------------------------------------------------------------------------
  // Example 4: Run Extraction
  // -------------------------------------------------------------------------
  console.log('\n4. Running AI Extraction');
  console.log('-'.repeat(40));

  console.log(`
  // Start extraction job
  const job = await client.extraction.run({
    projectId: project.id,
  });

  // Wait for completion
  const completedJob = await client.extraction.waitForCompletion(job.id);
  console.log('Status:', completedJob.status);
`);

  // -------------------------------------------------------------------------
  // Example 5: Export Results
  // -------------------------------------------------------------------------
  console.log('\n5. Exporting Results');
  console.log('-'.repeat(40));

  console.log(`
  // Export as CSV
  const csvExport = await client.exports.create({
    projectId: project.id,
    format: 'csv',
  });
  const csvData = await client.exports.download(csvExport.export.id);

  // Export as JSON
  const jsonExport = await client.exports.create({
    projectId: project.id,
    format: 'json',
  });
  const jsonData = await client.exports.download(jsonExport.export.id);
`);

  // -------------------------------------------------------------------------
  // Example 6: Error Handling
  // -------------------------------------------------------------------------
  console.log('\n6. Error Handling');
  console.log('-'.repeat(40));

  console.log(`
  import {
    AuthenticationError,
    NotFoundError,
    InsufficientCreditsError,
    RateLimitError,
    ValidationError,
  } from '@structurify/sdk';

  try {
    await client.projects.get('proj_invalid');
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Invalid API key');
    } else if (error instanceof NotFoundError) {
      console.error('Project not found');
    } else if (error instanceof InsufficientCreditsError) {
      console.error('Insufficient credits');
    } else if (error instanceof RateLimitError) {
      console.error('Rate limited, retry after:', error.retryAfter);
    } else if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
    }
  }
`);

  // -------------------------------------------------------------------------
  // Links
  // -------------------------------------------------------------------------
  console.log('\n' + '='.repeat(60));
  console.log('RESOURCES');
  console.log('='.repeat(60));
  console.log(`
  Website:       https://structurify.ai
  Documentation: https://docs.structurify.ai
  All Templates: https://structurify.ai/extract
  npm Package:   https://www.npmjs.com/package/@structurify/sdk
  Python SDK:    https://pypi.org/project/structurify/
  GitHub:        https://github.com/structurify/structurify-sdk
`);
}

// Run the example
main().catch(console.error);
