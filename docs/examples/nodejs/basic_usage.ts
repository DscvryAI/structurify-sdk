/**
 * Basic Usage Example - Node.js SDK
 *
 * Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
 * Licensed under the MIT License.
 */

import { Structurify } from '@structurify/sdk';
import { writeFileSync } from 'fs';

async function main() {
  // Initialize client
  const apiKey = process.env.STRUCTURIFY_API_KEY ?? 'sk_live_your_api_key';
  const client = new Structurify({ apiKey });

  // 1. List available templates
  console.log('Available templates:');
  const templates = await client.templates.list();
  for (const template of templates) {
    console.log(`  - ${template.name} (${template.id})`);
  }

  // 2. Create a project from template
  const project = await client.projects.create({
    name: 'Invoice Processing Example',
    templateId: 'tpl_invoice', // Use an actual template ID from step 1
  });
  console.log(`\nCreated project: ${project.id}`);

  // 3. Upload documents
  const documentPaths = ['invoice_001.pdf', 'invoice_002.pdf'];

  for (const docPath of documentPaths) {
    try {
      const doc = await client.documents.uploadFromPath(project.id, docPath);
      console.log(`Uploaded: ${doc.name} (${doc.id})`);
    } catch (error) {
      console.log(`Skipped ${docPath}: file not found`);
    }
  }

  // 4. Run extraction
  console.log('\nStarting extraction...');
  const job = await client.extraction.run(project.id);
  console.log(`Job started: ${job.id}`);

  // 5. Wait for completion
  const completed = await client.extraction.waitForCompletion(job.id, {
    timeout: 300000,
    pollInterval: 2000,
  });
  console.log(
    `Extraction complete: ${completed.completedTasks}/${completed.totalTasks} tasks`
  );

  // 6. Export results
  const exportResult = await client.exports.create({
    projectId: project.id,
    format: 'csv',
  });

  // Check if data is inline or needs download
  let csvData: string;
  if (exportResult.data) {
    csvData = exportResult.data;
  } else {
    csvData = (await client.exports.download(exportResult.export.id)) as string;
  }

  // Save to file
  writeFileSync('export_results.csv', csvData);
  console.log('\nResults exported to export_results.csv');
}

main().catch(console.error);
