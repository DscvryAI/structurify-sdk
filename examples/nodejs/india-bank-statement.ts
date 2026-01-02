/**
 * India Bank Statement Data Extraction Example
 *
 * Extract structured data from india bank statement documents using AI-powered extraction.
 *
 * Extract data from Indian bank statements
 *
 * Fields Extracted:
 *   - Bank Name
 *   - Branch
 *   - Account Number
 *   - Account Type
 *   - Account Holder Name
 *   - IFSC Code
 *   - Statement Period
 *   - Opening Balance
 *   - Closing Balance
 *   - Total Credits
 *
 * Industry: Financial Services
 * Try it online: https://structurify.ai/extract/india-bank-statement
 *
 * @see https://structurify.ai
 * @see https://docs.structurify.ai
 */

import { Structurify } from '@structurify/sdk';
import * as fs from 'fs';
import * as path from 'path';

// Initialize the client with your API key
// Get your API key from https://app.structurify.ai
const client = new Structurify({
  apiKey: process.env.STRUCTURIFY_API_KEY || 'sk_live_your_api_key',
});

async function extractIndiaBankStatement(filePath: string) {
  console.log('='.repeat(60));
  console.log('India Bank Statement Extraction');
  console.log('='.repeat(60));

  // Step 1: Create a project with the India Bank Statement template
  console.log('\n1. Creating project...');
  const project = await client.projects.create({
    name: 'India Bank Statement - SDK Example',
    templateId: 'ptpl_india_bank_statement',
  });
  console.log(`   Project created: ${project.id}`);

  // Step 2: Upload the document
  console.log('\n2. Uploading document...');
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  const doc = await client.documents.upload({
    projectId: project.id,
    file: new Blob([fileBuffer]),
    name: fileName,
  });
  console.log(`   Document uploaded: ${doc.name} (${doc.id})`);

  // Step 3: Run extraction
  console.log('\n3. Running AI extraction...');
  const job = await client.extraction.run({ projectId: project.id });
  console.log(`   Extraction job started: ${job.id}`);

  // Step 4: Wait for completion
  console.log('\n4. Waiting for completion...');
  const completedJob = await client.extraction.waitForCompletion(job.id);
  console.log(`   Status: ${completedJob.status}`);
  console.log(`   Completed tasks: ${completedJob.completedTasks || 'N/A'}`);

  // Step 5: Export results
  console.log('\n5. Exporting results...');

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

  console.log('\n' + '='.repeat(60));
  console.log('EXTRACTED DATA (CSV):');
  console.log('='.repeat(60));
  console.log(csvData);

  console.log('\n' + '='.repeat(60));
  console.log('EXTRACTED DATA (JSON):');
  console.log('='.repeat(60));
  console.log(JSON.stringify(JSON.parse(jsonData), null, 2));

  // Save results
  const outputCsv = `india-bank-statement_extracted.csv`;
  const outputJson = `india-bank-statement_extracted.json`;

  fs.writeFileSync(outputCsv, csvData);
  fs.writeFileSync(outputJson, jsonData);

  console.log(`\nResults saved to: ${outputCsv} and ${outputJson}`);

  return { csv: csvData, json: JSON.parse(jsonData) };
}

// Batch processing example
async function extractBatch(filePaths: string[]) {
  console.log('\n' + '='.repeat(60));
  console.log('BATCH PROCESSING');
  console.log('='.repeat(60));

  // Create project
  const project = await client.projects.create({
    name: 'India Bank Statement - Batch Processing',
    templateId: 'ptpl_india_bank_statement',
  });
  console.log(`Project created: ${project.id}`);

  // Upload all documents
  for (const filePath of filePaths) {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const doc = await client.documents.upload({
      projectId: project.id,
      file: new Blob([fileBuffer]),
      name: fileName,
    });
    console.log(`Uploaded: ${fileName}`);
  }

  // Run extraction on all documents
  const job = await client.extraction.run({ projectId: project.id });
  const completedJob = await client.extraction.waitForCompletion(job.id);

  console.log(`\nAll documents processed!`);
  console.log(`Status: ${completedJob.status}`);

  // Export all results
  const csvExport = await client.exports.create({
    projectId: project.id,
    format: 'csv',
  });
  const csvData = await client.exports.download(csvExport.export.id);

  return csvData;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
India Bank Statement Extraction Example
=======================================

Usage:
  npx ts-node india-bank-statement.ts <document-path>
  npx ts-node india-bank-statement.ts <doc1> <doc2> <doc3>  # Batch mode

Example:
  npx ts-node india-bank-statement.ts ./my-document.pdf

Environment:
  STRUCTURIFY_API_KEY - Your API key from https://app.structurify.ai

Learn more:
  - Online tool: https://structurify.ai/extract/india-bank-statement
  - Documentation: https://docs.structurify.ai
  - All templates: https://structurify.ai/extract
`);
  process.exit(0);
}

// Run extraction
(async () => {
  try {
    if (args.length === 1) {
      await extractIndiaBankStatement(args[0]);
    } else {
      await extractBatch(args);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
