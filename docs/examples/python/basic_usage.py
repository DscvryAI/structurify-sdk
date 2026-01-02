"""
Basic Usage Example - Python SDK

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

import os
from structurify import Structurify

# Initialize client
api_key = os.environ.get('STRUCTURIFY_API_KEY', 'sk_live_your_api_key')
client = Structurify(api_key=api_key)

# 1. List available templates
print("Available templates:")
templates = client.templates.list()
for template in templates:
    print(f"  - {template['name']} ({template['id']})")

# 2. Create a project from template
project = client.projects.create(
    name="Invoice Processing Example",
    template_id="tpl_invoice"  # Use an actual template ID from step 1
)
print(f"\nCreated project: {project['id']}")

# 3. Upload documents
documents = [
    "invoice_001.pdf",
    "invoice_002.pdf",
]

for doc_path in documents:
    if os.path.exists(doc_path):
        doc = client.documents.upload(
            project_id=project['id'],
            file_path=doc_path
        )
        print(f"Uploaded: {doc['name']} ({doc['id']})")

# 4. Run extraction
print("\nStarting extraction...")
job = client.extraction.run(project_id=project['id'])
print(f"Job started: {job['id']}")

# 5. Wait for completion
completed = client.extraction.wait_for_completion(
    job['id'],
    timeout=300,
    poll_interval=2.0
)
print(f"Extraction complete: {completed['completedTasks']}/{completed['totalTasks']} tasks")

# 6. Export results
export_result = client.exports.create(
    project_id=project['id'],
    format="csv"
)

# Check if data is inline or needs download
if 'data' in export_result:
    csv_data = export_result['data']
else:
    export_id = export_result.get('export', {}).get('id')
    if export_id:
        csv_data = client.exports.download(export_id)

# Save to file
with open("export_results.csv", "w") as f:
    f.write(csv_data)
print("\nResults exported to export_results.csv")
