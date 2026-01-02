#!/bin/bash
#
# Basic Usage Example - cURL
#
# Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
# Licensed under the MIT License.

# Set your API key
API_KEY="${STRUCTURIFY_API_KEY:-sk_live_your_api_key}"
BASE_URL="https://app.structurify.ai/api"

# Helper function for API calls
api_call() {
  curl -s -H "Authorization: Bearer $API_KEY" "$@"
}

# 1. List available templates
echo "Listing templates..."
api_call "$BASE_URL/project-templates" | jq '.templates[] | {id, name}'

# 2. Create a project from template
echo -e "\nCreating project..."
PROJECT=$(api_call -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Invoice Processing Example", "templateId": "tpl_invoice"}' \
  "$BASE_URL/projects")

PROJECT_ID=$(echo $PROJECT | jq -r '.project.id')
echo "Created project: $PROJECT_ID"

# 3. Upload a document (using base64 JSON method)
echo -e "\nUploading document..."
FILE_CONTENT=$(base64 -w 0 invoice.pdf 2>/dev/null || base64 invoice.pdf)

DOCUMENT=$(api_call -X POST \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"fileName\": \"invoice.pdf\",
    \"content\": \"$FILE_CONTENT\",
    \"mimeType\": \"application/pdf\"
  }" \
  "$BASE_URL/documents")

DOC_ID=$(echo $DOCUMENT | jq -r '.document.id')
echo "Uploaded document: $DOC_ID"

# 4. Run extraction
echo -e "\nStarting extraction..."
JOB=$(api_call -X POST \
  -H "Content-Type: application/json" \
  -d "{\"projectId\": \"$PROJECT_ID\"}" \
  "$BASE_URL/extraction-jobs")

JOB_ID=$(echo $JOB | jq -r '.job.id')
echo "Job started: $JOB_ID"

# 5. Poll for completion
echo -e "\nWaiting for extraction to complete..."
while true; do
  STATUS=$(api_call "$BASE_URL/extraction-jobs/$JOB_ID")
  JOB_STATUS=$(echo $STATUS | jq -r '.job.status')
  PROGRESS=$(echo $STATUS | jq -r '.job.progress')

  echo "Status: $JOB_STATUS ($PROGRESS%)"

  if [ "$JOB_STATUS" = "done" ] || [ "$JOB_STATUS" = "error" ] || [ "$JOB_STATUS" = "cancelled" ]; then
    break
  fi

  sleep 2
done

echo "Extraction complete!"

# 6. Export results
echo -e "\nExporting results..."
EXPORT=$(api_call -X POST \
  -H "Content-Type: application/json" \
  -d "{\"projectId\": \"$PROJECT_ID\", \"format\": \"csv\"}" \
  "$BASE_URL/exports")

# Check if data is inline
DATA=$(echo $EXPORT | jq -r '.data // empty')
if [ -n "$DATA" ]; then
  echo "$DATA" > export_results.csv
else
  EXPORT_ID=$(echo $EXPORT | jq -r '.export.id')
  api_call "$BASE_URL/exports/$EXPORT_ID/download" > export_results.csv
fi

echo "Results saved to export_results.csv"
