/**
 * Certificate of Conformance (CoC) Data Extraction Example
 *
 * Extract structured data from certificate of conformance (coc) documents using AI-powered extraction.
 *
 * Extract data from Certificates of Conformance/Compliance
 *
 * Fields Extracted:
 *   - Certificate Number
 *   - Certificate Date
 *   - Supplier Name
 *   - Supplier Address
 *   - Customer Name
 *   - PO Number
 *   - Part Number
 *   - Part Description
 *   - Part Revision
 *   - Quantity
 *
 * Industry: Manufacturing / Quality
 * Try it online: https://structurify.ai/extract/certificate-of-conformance-coc
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

async function extractCertificateOfConformanceCoc(filePath: string) {
  console.log('='.repeat(60));
  console.log('Certificate of Conformance (CoC) Extraction');
  console.log('='.repeat(60));

  // Step 1: Create a project with the Certificate of Conformance (CoC) template
  console.log('\n1. Creating project...');
  const project = await client.projects.create({
    name: 'Certificate of Conformance (CoC) - SDK Example',
    templateId: 'ptpl_coc',
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
  const outputCsv = `certificate-of-conformance-coc_extracted.csv`;
  const outputJson = `certificate-of-conformance-coc_extracted.json`;

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
    name: 'Certificate of Conformance (CoC) - Batch Processing',
    templateId: 'ptpl_coc',
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
Certificate of Conformance (CoC) Extraction Example
===================================================

Usage:
  npx ts-node certificate-of-conformance-coc.ts <document-path>
  npx ts-node certificate-of-conformance-coc.ts <doc1> <doc2> <doc3>  # Batch mode

Example:
  npx ts-node certificate-of-conformance-coc.ts ./my-document.pdf

Environment:
  STRUCTURIFY_API_KEY - Your API key from https://app.structurify.ai

Learn more:
  - Online tool: https://structurify.ai/extract/certificate-of-conformance-coc
  - Documentation: https://docs.structurify.ai
  - All templates: https://structurify.ai/extract
`);
  process.exit(0);
}

// Run extraction
(async () => {
  try {
    if (args.length === 1) {
      await extractCertificateOfConformanceCoc(args[0]);
    } else {
      await extractBatch(args);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
