# Structurify Node.js/TypeScript Examples

Ready-to-use TypeScript examples for extracting data from various document types.

**169 document types supported**

## Quick Start

```bash
# Install the SDK
npm install @structurify/sdk

# Set your API key
export STRUCTURIFY_API_KEY=sk_live_your_api_key

# Run an example
npx ts-node examples/nodejs/invoice-processing.ts ./invoice.pdf
```

---

## Accessibility

| Document Type | Description | Example |
|--------------|-------------|---------|
| Web Accessibility Audit (WCAG) | Identify accessibility issues from website screens... | [`web-accessibility-audit-wcag.ts`](nodejs/web-accessibility-audit-wcag.ts) |

## Analytics

| Document Type | Description | Example |
|--------------|-------------|---------|
| Customer Feedback Analysis | Analyze customer surveys, support tickets, reviews... | [`customer-feedback-analysis.ts`](nodejs/customer-feedback-analysis.ts) |

## Annotation

| Document Type | Description | Example |
|--------------|-------------|---------|
| Annotation Quality Review | Review and validate existing annotations for quali... | [`annotation-quality-review.ts`](nodejs/annotation-quality-review.ts) |
| Image Classification - ML Training | Label images with categories, attributes, and meta... | [`image-classification-ml-training.ts`](nodejs/image-classification-ml-training.ts) |
| Text Classification - ML Training | Label text documents with categories, sentiment, e... | [`text-classification-ml-training.ts`](nodejs/text-classification-ml-training.ts) |

## Compliance

| Document Type | Description | Example |
|--------------|-------------|---------|
| FATCA/CRS Self-Certification | Extract tax residency and status information from ... | [`fatcacrs-self-certification.ts`](nodejs/fatcacrs-self-certification.ts) |
| GDPR Data Processing Agreement | Extract key terms and obligations from GDPR Data P... | [`gdpr-data-processing-agreement.ts`](nodejs/gdpr-data-processing-agreement.ts) |
| HIPAA Business Associate Agreement | Extract key terms and obligations from HIPAA Busin... | [`hipaa-business-associate-agreement.ts`](nodejs/hipaa-business-associate-agreement.ts) |
| ISO 27001 Audit Report | Extract key findings from ISO 27001 certification ... | [`iso-27001-audit-report.ts`](nodejs/iso-27001-audit-report.ts) |
| ISO 27001 Statement of Applicability | Extract Annex A control selections, justifications... | [`iso-27001-statement-of-applicability.ts`](nodejs/iso-27001-statement-of-applicability.ts) |
| PCI DSS Compliance Report | Extract findings from PCI DSS ROC (Report on Compl... | [`pci-dss-compliance-report.ts`](nodejs/pci-dss-compliance-report.ts) |
| Privacy Policy Analysis | Analyze privacy policies for compliance, data prac... | [`privacy-policy-analysis.ts`](nodejs/privacy-policy-analysis.ts) |
| SOC 2 Report | Extract key data from SOC 2 Type I and Type II aud... | [`soc-2-report.ts`](nodejs/soc-2-report.ts) |
| Security Incident / Breach Report | Extract details from security incident reports, br... | [`security-incident-breach-report.ts`](nodejs/security-incident-breach-report.ts) |

## Construction

| Document Type | Description | Example |
|--------------|-------------|---------|
| AIA G702/G703 - Pay Application | Extract payment application data from AIA G702 (Ap... | [`aia-g702g703-pay-application.ts`](nodejs/aia-g702g703-pay-application.ts) |
| Construction Change Order | Extract data from construction change orders and c... | [`construction-change-order.ts`](nodejs/construction-change-order.ts) |
| Construction Submittal | Extract data from construction submittals | [`construction-submittal.ts`](nodejs/construction-submittal.ts) |
| Daily Field Report | Extract data from construction daily field/site re... | [`daily-field-report.ts`](nodejs/daily-field-report.ts) |
| Job Hazard Analysis (JHA) | Extract hazard assessments from Job Hazard Analysi... | [`job-hazard-analysis-jha.ts`](nodejs/job-hazard-analysis-jha.ts) |
| Lien Waiver | Extract data from conditional and unconditional li... | [`lien-waiver.ts`](nodejs/lien-waiver.ts) |
| Punch List | Extract data from construction punch lists | [`punch-list.ts`](nodejs/punch-list.ts) |
| Request for Information (RFI) | Extract data from construction RFIs | [`request-for-information-rfi.ts`](nodejs/request-for-information-rfi.ts) |
| WH-347 Certified Payroll | Extract worker classifications, hours, wages, and ... | [`wh-347-certified-payroll.ts`](nodejs/wh-347-certified-payroll.ts) |

## Ecommerce

| Document Type | Description | Example |
|--------------|-------------|---------|
| Product Catalog - Image to Listing | Generate product descriptions, tags, and attribute... | [`product-catalog-image-to-listing.ts`](nodejs/product-catalog-image-to-listing.ts) |

## Education

| Document Type | Description | Example |
|--------------|-------------|---------|
| Grant Notice of Award (NOA) | Extract funding amounts, dates, and terms from fed... | [`grant-notice-of-award-noa.ts`](nodejs/grant-notice-of-award-noa.ts) |

## Financial

| Document Type | Description | Example |
|--------------|-------------|---------|
| Bank Statement | Extract account information and transactions from ... | [`bank-statement.ts`](nodejs/bank-statement.ts) |
| Brasil - Extrato FGTS | Extrair dados do extrato do Fundo de Garantia do T... | [`brasil-extrato-fgts.ts`](nodejs/brasil-extrato-fgts.ts) |
| Credit Card Statement | Extract data from credit card statements | [`credit-card-statement.ts`](nodejs/credit-card-statement.ts) |
| EU Standard Invoice | Extract data from European standard invoices | [`eu-standard-invoice.ts`](nodejs/eu-standard-invoice.ts) |
| Expense Reports | Extract expense report details for reimbursement | [`expense-reports.ts`](nodejs/expense-reports.ts) |
| IRS Form 1099-NEC / 1099-MISC | Extract data from 1099 tax forms for contractor pa... | [`irs-form-1099-nec-1099-misc.ts`](nodejs/irs-form-1099-nec-1099-misc.ts) |
| IRS Form W-2 | Extract data from W-2 Wage and Tax Statements | [`irs-form-w-2.ts`](nodejs/irs-form-w-2.ts) |
| IRS Form W-9 | Extract data from W-9 Request for Taxpayer Identif... | [`irs-form-w-9.ts`](nodejs/irs-form-w-9.ts) |
| India Bank Statement | Extract data from Indian bank statements | [`india-bank-statement.ts`](nodejs/india-bank-statement.ts) |
| India Electricity Bill | Extract data from Indian electricity bills | [`india-electricity-bill.ts`](nodejs/india-electricity-bill.ts) |
| India GST Invoice | Extract data from Indian GST invoices | [`india-gst-invoice.ts`](nodejs/india-gst-invoice.ts) |
| Invoice Processing | Extract invoice data for accounts payable automati... | [`invoice-processing.ts`](nodejs/invoice-processing.ts) |
| Loan Application | Extract data from loan application forms | [`loan-application.ts`](nodejs/loan-application.ts) |
| Purchase Order | Extract data from purchase orders | [`purchase-order.ts`](nodejs/purchase-order.ts) |
| Remittance Advice | Extract payment remittance details | [`remittance-advice.ts`](nodejs/remittance-advice.ts) |
| SEPA Payment Document | Extract data from SEPA credit transfers and direct... | [`sepa-payment-document.ts`](nodejs/sepa-payment-document.ts) |
| Schedule K-1 (1065/1120S) | Extract partner/shareholder income allocation from... | [`schedule-k-1-10651120s.ts`](nodejs/schedule-k-1-10651120s.ts) |
| UK VAT Invoice | Extract data from UK VAT invoices | [`uk-vat-invoice.ts`](nodejs/uk-vat-invoice.ts) |
| Uniform Residential Appraisal Report | Extract URAR form data for residential property ap... | [`uniform-residential-appraisal-report.ts`](nodejs/uniform-residential-appraisal-report.ts) |
| Utility Bill | Extract data from utility bills | [`utility-bill.ts`](nodejs/utility-bill.ts) |
| Voided Check | Extract bank routing and account information from ... | [`voided-check.ts`](nodejs/voided-check.ts) |

## General

| Document Type | Description | Example |
|--------------|-------------|---------|
| General Correspondence | Extract metadata from letters and emails | [`general-correspondence.ts`](nodejs/general-correspondence.ts) |
| Meeting Notes | Extract action items from meeting transcripts | [`meeting-notes.ts`](nodejs/meeting-notes.ts) |
| Research Papers | Extract metadata from academic papers | [`research-papers.ts`](nodejs/research-papers.ts) |
| Species Identification | Identify wildlife species and detect injuries from... | [`species-identification.ts`](nodejs/species-identification.ts) |

## Government

| Document Type | Description | Example |
|--------------|-------------|---------|
| IRS Form 1040 | Extract U.S. Individual Income Tax Return data | [`irs-form-1040.ts`](nodejs/irs-form-1040.ts) |
| IRS Form 1095-A | Extract Health Insurance Marketplace Statement dat... | [`irs-form-1095-a.ts`](nodejs/irs-form-1095-a.ts) |
| India Income Tax Return | Extract data from Indian ITR forms | [`india-income-tax-return.ts`](nodejs/india-income-tax-return.ts) |
| KSA Tax Registration | Extract data from Saudi Arabia tax registration do... | [`ksa-tax-registration.ts`](nodejs/ksa-tax-registration.ts) |
| UK Council Tax Bill | Extract data from UK council tax bills | [`uk-council-tax-bill.ts`](nodejs/uk-council-tax-bill.ts) |
| UK P45 Leaving Certificate | Extract data from UK P45 forms | [`uk-p45-leaving-certificate.ts`](nodejs/uk-p45-leaving-certificate.ts) |
| UK P60 End of Year Certificate | Extract data from UK P60 tax forms | [`uk-p60-end-of-year-certificate.ts`](nodejs/uk-p60-end-of-year-certificate.ts) |
| US Customs Entry Summary 7501 | Extract data from CBP Form 7501 customs entry | [`us-customs-entry-summary-7501.ts`](nodejs/us-customs-entry-summary-7501.ts) |

## Healthcare

| Document Type | Description | Example |
|--------------|-------------|---------|
| Explanation of Benefits (EOB) | Extract payment and denial data from insurance Exp... | [`explanation-of-benefits-eob.ts`](nodejs/explanation-of-benefits-eob.ts) |
| Health Insurance Card US | Extract data from US health insurance cards | [`health-insurance-card-us.ts`](nodejs/health-insurance-card-us.ts) |
| Healthcare EDI Documents | Extract data from EDI 835/837 healthcare transacti... | [`healthcare-edi-documents.ts`](nodejs/healthcare-edi-documents.ts) |
| Insurance Claims | Extract claim data from insurance documents | [`insurance-claims.ts`](nodejs/insurance-claims.ts) |
| Laboratory Results | Extract data from medical lab test results | [`laboratory-results.ts`](nodejs/laboratory-results.ts) |
| Medical Prescription | Extract data from medical prescriptions | [`medical-prescription.ts`](nodejs/medical-prescription.ts) |
| Medical Records | Extract clinical data from medical documents | [`medical-records.ts`](nodejs/medical-records.ts) |
| Medical Referral Letter | Extract referral details from physician referral l... | [`medical-referral-letter.ts`](nodejs/medical-referral-letter.ts) |
| Ontario Laboratory Requisition | Extract data from Ontario lab requisition forms | [`ontario-laboratory-requisition.ts`](nodejs/ontario-laboratory-requisition.ts) |
| Patient Intake Form | Extract patient demographic and insurance informat... | [`patient-intake-form.ts`](nodejs/patient-intake-form.ts) |
| Pharmacy Receipt | Extract data from pharmacy receipts and prescripti... | [`pharmacy-receipt.ts`](nodejs/pharmacy-receipt.ts) |

## Hr

| Document Type | Description | Example |
|--------------|-------------|---------|
| Brasil - Cartão de Ponto | Extrair dados de registro de ponto para cálculo de... | [`brasil-cartão-de-ponto.ts`](nodejs/brasil-cartão-de-ponto.ts) |
| Brasil - Holerite / Contracheque | Extrair dados do holerite/contracheque brasileiro ... | [`brasil-holerite-contracheque.ts`](nodejs/brasil-holerite-contracheque.ts) |
| Brasil - TRCT (Termo de Rescisão) | Extrair dados do Termo de Rescisão do Contrato de ... | [`brasil-trct-termo-de-rescisão.ts`](nodejs/brasil-trct-termo-de-rescisão.ts) |
| Direct Deposit / ACH Authorization | Extract bank account and routing details from dire... | [`direct-deposit-ach-authorization.ts`](nodejs/direct-deposit-ach-authorization.ts) |
| Employment Contract | Extract terms from employment agreements | [`employment-contract.ts`](nodejs/employment-contract.ts) |
| Form I-9 (Employment Eligibility) | Extract employee identity, work authorization, and... | [`form-i-9-employment-eligibility.ts`](nodejs/form-i-9-employment-eligibility.ts) |
| Form W-4 (Employee Withholding) | Extract withholding elections, filing status, and ... | [`form-w-4-employee-withholding.ts`](nodejs/form-w-4-employee-withholding.ts) |
| Payslip / Pay Stub | Extract data from employee payslips | [`payslip-pay-stub.ts`](nodejs/payslip-pay-stub.ts) |
| Resume Screening | Extract candidate information from resumes for ATS... | [`resume-screening.ts`](nodejs/resume-screening.ts) |

## Identity

| Document Type | Description | Example |
|--------------|-------------|---------|
| Brasil - CTPS Digital | Extrair dados da Carteira de Trabalho e Previdênci... | [`brasil-ctps-digital.ts`](nodejs/brasil-ctps-digital.ts) |
| EU National ID Card | Extract data from European national ID cards | [`eu-national-id-card.ts`](nodejs/eu-national-id-card.ts) |
| India Aadhaar Card | Extract data from Indian Aadhaar cards | [`india-aadhaar-card.ts`](nodejs/india-aadhaar-card.ts) |
| India PAN Card | Extract data from Indian PAN cards | [`india-pan-card.ts`](nodejs/india-pan-card.ts) |
| Passport | Extract data from international passports | [`passport.ts`](nodejs/passport.ts) |
| UK Driving Licence | Extract data from UK driving licences | [`uk-driving-licence.ts`](nodejs/uk-driving-licence.ts) |
| US Driver's License | Extract data from US driver's licenses | [`us-drivers-license.ts`](nodejs/us-drivers-license.ts) |
| Visa Document | Extract data from visa stickers and documents | [`visa-document.ts`](nodejs/visa-document.ts) |

## Insurance

| Document Type | Description | Example |
|--------------|-------------|---------|
| ACORD 125 - Commercial Insurance Application | Extract data from ACORD 125 commercial insurance a... | [`acord-125-commercial-insurance-application.ts`](nodejs/acord-125-commercial-insurance-application.ts) |
| ACORD 2 - Automobile Loss Notice | Extract data from ACORD 2 auto loss/claim notices | [`acord-2-automobile-loss-notice.ts`](nodejs/acord-2-automobile-loss-notice.ts) |
| ACORD 25 - Certificate of Liability Insurance | Extract data from ACORD 25 certificates of insuran... | [`acord-25-certificate-of-liability-insurance.ts`](nodejs/acord-25-certificate-of-liability-insurance.ts) |
| ACORD 28 - Evidence of Property Insurance | Extract data from ACORD 28 commercial property ins... | [`acord-28-evidence-of-property-insurance.ts`](nodejs/acord-28-evidence-of-property-insurance.ts) |
| Insurance Loss Run Report | Extract claim history from loss run reports for un... | [`insurance-loss-run-report.ts`](nodejs/insurance-loss-run-report.ts) |
| Policy Declaration Page | Extract coverage details from insurance policy dec... | [`policy-declaration-page.ts`](nodejs/policy-declaration-page.ts) |

## Intelligence

| Document Type | Description | Example |
|--------------|-------------|---------|
| Brand Monitoring & Mentions | Extract brand mentions, sentiment, and competitive... | [`brand-monitoring-mentions.ts`](nodejs/brand-monitoring-mentions.ts) |
| Competitive Intelligence | Extract product features, pricing, and positioning... | [`competitive-intelligence.ts`](nodejs/competitive-intelligence.ts) |

## Legal

| Document Type | Description | Example |
|--------------|-------------|---------|
| Affidavit / Sworn Declaration | Extract declarant information, statements, and att... | [`affidavit-sworn-declaration.ts`](nodejs/affidavit-sworn-declaration.ts) |
| Brasil - Guia de Depósito Judicial | Extrair dados de guias de depósito judicial/recurs... | [`brasil-guia-de-depósito-judicial.ts`](nodejs/brasil-guia-de-depósito-judicial.ts) |
| CMR International Consignment Note | Extract data from CMR international road transport... | [`cmr-international-consignment-note.ts`](nodejs/cmr-international-consignment-note.ts) |
| California Real Estate Forms | Extract data from California real estate transacti... | [`california-real-estate-forms.ts`](nodejs/california-real-estate-forms.ts) |
| Contract Review | Extract key terms, obligations, and risk factors f... | [`contract-review.ts`](nodejs/contract-review.ts) |
| Due Diligence | Extract information for M&A due diligence review | [`due-diligence.ts`](nodejs/due-diligence.ts) |
| GDPR Data Subject Access Request | Extract data from GDPR DSAR documents | [`gdpr-data-subject-access-request.ts`](nodejs/gdpr-data-subject-access-request.ts) |
| IP Office Action & WIPO Notification | Extract deadlines, rejections, and claims from USP... | [`ip-office-action-wipo-notification.ts`](nodejs/ip-office-action-wipo-notification.ts) |
| Lease Agreement US | Extract data from US residential lease agreements | [`lease-agreement-us.ts`](nodejs/lease-agreement-us.ts) |
| Letter of Intent (LOI) | Extract key terms from M&A letters of intent and i... | [`letter-of-intent-loi.ts`](nodejs/letter-of-intent-loi.ts) |
| Litigation Discovery | Categorize and extract metadata from discovery doc... | [`litigation-discovery.ts`](nodejs/litigation-discovery.ts) |
| MSA / SOW / Order Form | Extract structured terms, deliverables, and pricin... | [`msa-sow-order-form.ts`](nodejs/msa-sow-order-form.ts) |
| Power of Attorney | Extract parties, scope of authority, and terms fro... | [`power-of-attorney.ts`](nodejs/power-of-attorney.ts) |
| Term Sheet | Extract key terms from investment term sheets (VC,... | [`term-sheet.ts`](nodejs/term-sheet.ts) |
| Vehicle Certificate of Title | Extract data from US vehicle titles | [`vehicle-certificate-of-title.ts`](nodejs/vehicle-certificate-of-title.ts) |

## Logistics

| Document Type | Description | Example |
|--------------|-------------|---------|
| Air Waybill | Extract data from air waybills (AWB) | [`air-waybill.ts`](nodejs/air-waybill.ts) |
| Automotive Repair Order | Extract vehicle data, labor, and line-item parts f... | [`automotive-repair-order.ts`](nodejs/automotive-repair-order.ts) |
| Bill of Lading | Extract data from ocean/freight bills of lading | [`bill-of-lading.ts`](nodejs/bill-of-lading.ts) |
| Certificate of Origin | Extract data from certificates of origin for custo... | [`certificate-of-origin.ts`](nodejs/certificate-of-origin.ts) |
| Delivery Note | Extract data from delivery notes and proof of deli... | [`delivery-note.ts`](nodejs/delivery-note.ts) |
| Packing List | Extract data from commercial packing lists | [`packing-list.ts`](nodejs/packing-list.ts) |
| Shipper's Letter of Instruction (SLI) | Extract export documentation instructions from Shi... | [`shippers-letter-of-instruction-sli.ts`](nodejs/shippers-letter-of-instruction-sli.ts) |

## Manufacturing

| Document Type | Description | Example |
|--------------|-------------|---------|
| Certificate of Analysis (COA) | Extract test results from Certificates of Analysis... | [`certificate-of-analysis-coa.ts`](nodejs/certificate-of-analysis-coa.ts) |
| Certificate of Conformance (CoC) | Extract data from Certificates of Conformance/Comp... | [`certificate-of-conformance-coc.ts`](nodejs/certificate-of-conformance-coc.ts) |
| First Article Inspection (FAI) | Extract data from AS9102 First Article Inspection ... | [`first-article-inspection-fai.ts`](nodejs/first-article-inspection-fai.ts) |
| Non-Conformance Report (NCR) | Extract data from quality non-conformance and corr... | [`non-conformance-report-ncr.ts`](nodejs/non-conformance-report-ncr.ts) |
| PPAP Submission | Extract data from Production Part Approval Process... | [`ppap-submission.ts`](nodejs/ppap-submission.ts) |
| Quality Inspection Report | Extract data from dimensional inspection and CMM r... | [`quality-inspection-report.ts`](nodejs/quality-inspection-report.ts) |
| Safety Data Sheet (SDS/MSDS) | Extract hazard and handling information from Safet... | [`safety-data-sheet-sdsmsds.ts`](nodejs/safety-data-sheet-sdsmsds.ts) |

## Moderation

| Document Type | Description | Example |
|--------------|-------------|---------|
| Content Moderation | Analyze images and documents for policy violations... | [`content-moderation.ts`](nodejs/content-moderation.ts) |

## Mortgage

| Document Type | Description | Example |
|--------------|-------------|---------|
| Closing Disclosure (TRID) | Extract final loan terms, actual fees, and settlem... | [`closing-disclosure-trid.ts`](nodejs/closing-disclosure-trid.ts) |
| Loan Estimate (TRID) | Extract loan terms, fees, and disclosures from CFP... | [`loan-estimate-trid.ts`](nodejs/loan-estimate-trid.ts) |

## Oil Gas

| Document Type | Description | Example |
|--------------|-------------|---------|
| AFE - Authorization for Expenditure | Extract data from Oil & Gas Authorization for Expe... | [`afe-authorization-for-expenditure.ts`](nodejs/afe-authorization-for-expenditure.ts) |
| Biostratigraphy Report | Extract fossil events, zonation, and age data from... | [`biostratigraphy-report.ts`](nodejs/biostratigraphy-report.ts) |
| Drilling Mud Report | Extract drilling fluid data from mud reports (Baro... | [`drilling-mud-report.ts`](nodejs/drilling-mud-report.ts) |
| Graph/Chart Digitization | Extract X,Y coordinate data points from graphs, ch... | [`graphchart-digitization.ts`](nodejs/graphchart-digitization.ts) |
| Petrophysical Data Table | Extract formation evaluation data from petrophysic... | [`petrophysical-data-table.ts`](nodejs/petrophysical-data-table.ts) |
| Well Log Curve Digitization | Digitize well log curves to extract depth vs curve... | [`well-log-curve-digitization.ts`](nodejs/well-log-curve-digitization.ts) |
| Well Log Header | Extract metadata from well log headers (wireline l... | [`well-log-header.ts`](nodejs/well-log-header.ts) |

## Pharma

| Document Type | Description | Example |
|--------------|-------------|---------|
| Adverse Event Report | Extract data from adverse event and pharmacovigila... | [`adverse-event-report.ts`](nodejs/adverse-event-report.ts) |
| Batch Production Record | Extract data from pharmaceutical batch manufacturi... | [`batch-production-record.ts`](nodejs/batch-production-record.ts) |
| Clinical Trial Protocol | Extract key data from clinical trial protocols and... | [`clinical-trial-protocol.ts`](nodejs/clinical-trial-protocol.ts) |
| FDA 483 Observations | Extract observations from FDA Form 483 inspection ... | [`fda-483-observations.ts`](nodejs/fda-483-observations.ts) |
| Stability Study Report | Extract data from pharmaceutical stability study r... | [`stability-study-report.ts`](nodejs/stability-study-report.ts) |

## Procurement

| Document Type | Description | Example |
|--------------|-------------|---------|
| Master Purchase Agreement | Extract key terms from master purchasing agreement... | [`master-purchase-agreement.ts`](nodejs/master-purchase-agreement.ts) |
| Request for Proposal (RFP) | Extract key requirements from RFP documents | [`request-for-proposal-rfp.ts`](nodejs/request-for-proposal-rfp.ts) |
| Request for Quotation (RFQ) | Extract data from Request for Quotation documents | [`request-for-quotation-rfq.ts`](nodejs/request-for-quotation-rfq.ts) |
| Supplier Qualification Questionnaire | Extract data from supplier qualification/onboardin... | [`supplier-qualification-questionnaire.ts`](nodejs/supplier-qualification-questionnaire.ts) |
| Vendor Master Data Form | Extract vendor/supplier onboarding data for ERP an... | [`vendor-master-data-form.ts`](nodejs/vendor-master-data-form.ts) |
| Vendor Performance Scorecard | Extract data from vendor/supplier performance eval... | [`vendor-performance-scorecard.ts`](nodejs/vendor-performance-scorecard.ts) |

## Real Estate

| Document Type | Description | Example |
|--------------|-------------|---------|
| CAM Reconciliation | Extract Common Area Maintenance reconciliation dat... | [`cam-reconciliation.ts`](nodejs/cam-reconciliation.ts) |
| Commercial Lease Abstraction | Extract comprehensive terms from commercial real e... | [`commercial-lease-abstraction.ts`](nodejs/commercial-lease-abstraction.ts) |
| Lease Abstraction | Extract key terms from commercial leases | [`lease-abstraction.ts`](nodejs/lease-abstraction.ts) |
| Property Inspection | Extract findings from property inspection reports | [`property-inspection.ts`](nodejs/property-inspection.ts) |
| Rent Roll | Extract tenant and rent data from property rent ro... | [`rent-roll.ts`](nodejs/rent-roll.ts) |

## Tax

| Document Type | Description | Example |
|--------------|-------------|---------|
| Form 1099-K (Payment Card/Marketplace) | Extract gross payment amounts and transaction data... | [`form-1099-k-payment-cardmarketplace.ts`](nodejs/form-1099-k-payment-cardmarketplace.ts) |
| Form W-8BEN (Individual) | Extract foreign status and treaty benefits from IR... | [`form-w-8ben-individual.ts`](nodejs/form-w-8ben-individual.ts) |
| Form W-8BEN-E (Entity) | Extract foreign entity status, FATCA classificatio... | [`form-w-8ben-e-entity.ts`](nodejs/form-w-8ben-e-entity.ts) |

## Technology

| Document Type | Description | Example |
|--------------|-------------|---------|
| AWS Invoice | Extract billing details, service charges, and usag... | [`aws-invoice.ts`](nodejs/aws-invoice.ts) |
| Azure Invoice | Extract billing details, service charges, and usag... | [`azure-invoice.ts`](nodejs/azure-invoice.ts) |
| Google Cloud Invoice | Extract billing details, service charges, and usag... | [`google-cloud-invoice.ts`](nodejs/google-cloud-invoice.ts) |
| SBOM & Vulnerability Report | Extract components, versions, licenses, and CVEs f... | [`sbom-vulnerability-report.ts`](nodejs/sbom-vulnerability-report.ts) |

## Trade Finance

| Document Type | Description | Example |
|--------------|-------------|---------|
| Bank Guarantee | Extract data from bank guarantees and standby lett... | [`bank-guarantee.ts`](nodejs/bank-guarantee.ts) |
| Bill of Exchange / Draft | Extract data from bills of exchange and trade draf... | [`bill-of-exchange-draft.ts`](nodejs/bill-of-exchange-draft.ts) |
| Commercial Invoice (Trade) | Extract data from commercial invoices for trade fi... | [`commercial-invoice-trade.ts`](nodejs/commercial-invoice-trade.ts) |
| Letter of Credit (LC) | Extract data from documentary letters of credit | [`letter-of-credit-lc.ts`](nodejs/letter-of-credit-lc.ts) |
| Packing Credit / Pre-Export Finance | Extract data from packing credit and pre-export fi... | [`packing-credit-pre-export-finance.ts`](nodejs/packing-credit-pre-export-finance.ts) |
| SWIFT MT103 (Wire Transfer) | Extract payment details from SWIFT MT103 single cu... | [`swift-mt103-wire-transfer.ts`](nodejs/swift-mt103-wire-transfer.ts) |

## Vendor Risk

| Document Type | Description | Example |
|--------------|-------------|---------|
| Security Questionnaire (SIG/CAIQ) | Extract and analyze responses from security questi... | [`security-questionnaire-sigcaiq.ts`](nodejs/security-questionnaire-sigcaiq.ts) |
| Vendor Risk Assessment | Comprehensive third-party vendor risk assessment f... | [`vendor-risk-assessment.ts`](nodejs/vendor-risk-assessment.ts) |

## Wealth

| Document Type | Description | Example |
|--------------|-------------|---------|
| Investment Portfolio Statement | Extract data from brokerage and investment account... | [`investment-portfolio-statement.ts`](nodejs/investment-portfolio-statement.ts) |
| Investment Suitability Questionnaire | Extract data from client investment suitability an... | [`investment-suitability-questionnaire.ts`](nodejs/investment-suitability-questionnaire.ts) |
| KYC - Corporate/Entity | Extract data from Know Your Customer documents for... | [`kyc-corporateentity.ts`](nodejs/kyc-corporateentity.ts) |
| KYC - Individual Client | Extract data from Know Your Customer documents for... | [`kyc-individual-client.ts`](nodejs/kyc-individual-client.ts) |
| Trust Document Summary | Extract key terms from trust agreements and trust ... | [`trust-document-summary.ts`](nodejs/trust-document-summary.ts) |

---

## Running Examples

### Single Document

```bash
npx ts-node examples/nodejs/invoice-processing.ts ./invoice.pdf
```

### Batch Processing

```bash
npx ts-node examples/nodejs/invoice-processing.ts ./doc1.pdf ./doc2.pdf ./doc3.pdf
```

### Using JavaScript (no TypeScript)

```bash
# Compile first
npx tsc examples/nodejs/invoice-processing.ts

# Run
node examples/nodejs/invoice-processing.js ./invoice.pdf
```

## Links

- [Structurify Website](https://structurify.ai)
- [All Templates](https://structurify.ai/extract)
- [Documentation](https://docs.structurify.ai)
- [npm Package](https://www.npmjs.com/package/@structurify/sdk)
- [Python SDK](https://pypi.org/project/structurify/)