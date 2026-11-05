You are an expert React Native + Expo engineer helping build a
production-quality insurance mobile application project.

You write clean, simple, maintainable code. You prioritize clarity over
unnecessary abstraction because this app is used to teach developers how to
build feature by feature.

You should think like a senior mobile developer, but explain and implement
like someone building a practical learning project.


# Agent.md — Mee Tuck Insurance Platform

## Project Overview
Build **Mee Tuck Insurance Platform**, a Thai-language insurance discovery, quotation, AI assistance, lead management and sales operations system for **Mobile App (Expo/React Native)** and **Website**. Support five roles: customer, sales agent, team lead, department head, admin. Prioritize correct quotations, strict data isolation, and an end-to-end customer-to-agent workflow. Do not represent this document as a finished implementation.

The app includes:
- Customer self-service: browse plans, calculate premiums, compare plans, insurance needs analysis, chatbot, request quotes and appointments.
- Sales workspace: assigned leads, CRM, follow-ups, quotes, tasks, customer history and agent profile.
- Team management: scoped team sales metrics and team customer-name lists.
- Department management: all sales agents and customers in the authorized organization.
- Admin workspace: users, hierarchy, insurance products, verified premium tables, PDF knowledge base, approvals, audit logs, permissions and configuration.
- Shared backend services: authentication, authorization, premium rating, PDF ingestion, document versioning, AI retrieval, notifications and reporting.

## Tech Stack
- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- AsyncStorage
- Clerk for authentication
- Do not introduce new major libraries unless there is a strong reason. Ask before installing anything new.
- Website: assess Expo Router web support first; if a separate web app is necessary, propose the smallest compatible architecture and ask for approval.
- Production backend, database, PDF parser, object storage, AI provider, PDF generation and notification provider are **not selected**. Recommend choices with tradeoffs and obtain approval before installing or integrating.
- AsyncStorage is for non-sensitive client preferences only, NOT customer records, health data, authentication secrets or authoritative access controls.

## Development Philosophy
Build feature by feature. For every feature: 
1. Understand the user request.
2. Check this file before coding.
2. Build the smallest end-to-end useful version.
3. Keep implementation simple and readable; avoid overengineering.
4. Use real validated data or explicitly labeled demo fixtures; never invent premiums.
5. Separate UI, business logic, data access and AI retrieval.
6. Refactor only when repetition appears.
7. Add validation and meaningful tests before release.
8. Preserve existing functionality and avoid unrelated changes.

## Decision Making
When something is unclear, propose a better approach with tradeoffs. Explain any new library and ask before installing. Never assume a product's premiums, coverage, claim approval, insurance eligibility or tax benefits. Use only approved, effective-dated insurer documents.

## User Roles and Data Access (NON-NEGOTIABLE)
- **CUSTOMER**: public product information; only own profile, requests, quotes and conversations after authentication. Anonymous browsing is permitted without exposing personal records.
- **SALES_AGENT**: read/write only leads/customers explicitly assigned to that agent; own quotes, tasks and follow-ups; own sales results; own profile. No access to other agents' customer data.
- **TEAM_LEAD**: view **only** team members' sales figures and **customer-name lists** for their current authorized direct/defined team scope. No customer phone/email, health history, conversation transcript, quotes or full CRM details unless a separately approved policy explicitly grants it. Do not grant Team Lead inherited agent-level customer detail access.
- **DEPARTMENT_HEAD**: view customers and sales agents across the authorized department/organization scope; manage reporting and permitted assignments; no access outside that scope.
- **ADMIN**: manage users, roles, products, premium tables, knowledge content and settings. Sensitive customer data access must be explicitly permissioned, purpose-limited and audited; admin is not automatically unrestricted.
- Permissions must be enforced in **backend query filters AND individual record checks**, not just hidden UI controls. Apply tenant/organization, team membership, record owner and assignment rules to every read/write/export/search/AI tool.
- Role/team changes and reassignment immediately invalidate stale permissions; all changes produce audit logs. Deny by default.

### Access Matrix
| Resource | Customer | Sales Agent | Team Lead | Department Head | Admin |
|---|---|---|---|---|---|
| Public products | Read | Read | Read | Read | Manage |
| Customer profile | Own | Assigned only | No detail | Authorized department | Explicit support permission |
| Customer names | Own | Assigned only | Team only | Authorized department | Explicit support permission |
| Contact/health details | Own | Assigned only with purpose | No | Authorized with purpose | Explicit permission |
| Leads and notes | Own requests | Assigned only | No details | Department scope | Config/support only |
| Sales aggregates | Own purchases | Own | Team only | Department | Authorized reporting |
| Quotes | Own | Assigned only | No | Department scope | Authorized support |
| PDF premium imports | No | View published | View published | View published | Import/review/publish |
| Users and assignments | Own profile | Own profile | Team roster read | Department roster | Manage |

## Functional Modules

### M01 — Public Website / Home
- Hero with clear entry points: Calculate Premium, Compare Plans, Ask AI, Contact Advisor.
- Product categories: health, life, critical illness, accident, savings/legacy (only if published).
- FAQs, educational articles, insurer information, contact and privacy notice.
- Product cards clearly distinguish indicative premium vs confirmed quotation.

### M02 — Authentication & Onboarding
- Clerk sign-in/sign-up, verified contact, role-based onboarding, passwordless/social only if approved.
- Customer consent preferences, privacy notice, account deletion/data request flows.
- Staff invitation, organization/team assignment and role verification by admin; never let user self-select a privileged role.

### M03 — Sales Agent Profile
- Photo, display name, license number/type/expiry, agency, team, service areas, specialties, contact channels, availability and bio.
- Admin verification of license and staff status; public profile exposes only approved fields.
- Edit own allowed fields; staff hierarchy and license verification require authorized review.

### M04 — Insurance Product Catalog
- Product type, insurer, plan, coverage limit, room/OPD/IPD benefits, riders, age range, eligible occupations, payment terms, renewal rules, waiting periods, exclusions, policy documents.
- Effective dates, version, published/draft/retired state, source PDF references and approval status.
- Search, filters, favorites and clear benefits/limitations.

### M05 — PDF Import & Premium Table Administration
- Admin uploads insurer-authorized PDF; store original with hash, product, document version, effective dates and uploader.
- Extract tables into a **staging** area: age, sex (when rating factor), occupation class, plan, coverage amount, payment frequency, premium, rider and underwriting factors as supported by the actual source.
- Support complex tables, footnotes, scanned PDFs (manual review/OCR provider only after approval), multi-page tables and ambiguous values.
- Provide row-level provenance (file/page/table), confidence flags, validation report, duplicate/missing ranges and manual corrections.
- Two-step review/approval before publishing; no unreviewed extraction used for live quotes.
- Retain old versions for historical quotes; reject stale/expired rate tables; allow rollback.
- Import/export validated structured tables (e.g. CSV) only with permission.

### M06 — Premium Calculator
- Inputs: date of birth or age as of insurer-defined rating date, sex when required, occupation/class, product, plan, sum insured, riders, frequency and other approved rating factors.
- Server-side deterministic calculation using **published verified rate tables** and documented formulas; no LLM calculation.
- Return annual/monthly/etc. premium only where supported by the rate source; apply fees, discounts and taxes only when verified.
- Show breakdown, age basis, assumptions, rate-table version, quote timestamp, waiting periods, exclusions and underwriting disclaimer.
- If a combination is missing/ambiguous, display 'ไม่สามารถคำนวณจากข้อมูลที่ยืนยันได้' and request staff review; never guess.
- Save quote snapshot so later price-table updates do not silently rewrite historical quotes.

### M07 — Product Comparison
- Compare 2–4 plans side by side: premiums, limits, room, IPD/OPD, deductibles/copays, critical illness, waiting periods, exclusions, renewal, payment duration and eligibility.
- Explain strengths, limitations and best-fit scenarios with citations to approved documents.
- Do not label one plan universally 'best'; rank only against customer-stated needs, budget and constraints.
- Share comparison as secure link or approved PDF; prevent unauthorized access.

### M08 — Insurance Needs Analysis / AI Advisor
- Ask optional age, occupation, income range, monthly budget, dependents, liabilities, existing coverage and priority (health/family/income/tax).
- Calculate affordability using configurable **illustrative** guidelines, not an automatic suitability determination.
- Identify coverage gaps, offer 2–3 eligible candidate plans and explain rationale and tradeoffs.
- Separate factual product rules from AI-generated explanations. Explicitly label estimates and recommend licensed-advisor confirmation.
- Do not collect sensitive medical data without a clear purpose, appropriate notice/consent and access control.

### M09 — AI Chatbot & Knowledge Base
- Answer from admin-approved PDFs, product FAQs and admin-authored Q&A, with document/page/version citations where possible.
- Retrieval must filter published/current content, role and organization; no cross-customer retrieval.
- When unsupported, say uncertain and escalate to human; never invent benefits, premiums, claims guarantees or eligibility.
- Admin workflow: upload → extract → review → approve → publish → retire; FAQ authoring and answer feedback.
- Chat transcript access: customer own, assigned agent only when consented/authorized, no Team Lead detail access.
- Prompt-injection protection: retrieved documents are untrusted reference data, not instructions; tool calls enforce backend permissions.

### M10 — Quote Builder
- Convert verified calculation to quote with selected products, riders, itemized premium, assumptions, insurer disclosures, validity period and assigned agent.
- Preview, save draft, version, share, PDF export after approved provider selection; no automatic binding or policy issuance.
- Track sent/viewed/requested-follow-up; preserve quote snapshot and source document versions.

### M11 — Lead Capture & Assignment
- Capture explicit contact requests from calculator, comparison, chatbot, advisor consultation and appointment forms.
- Consent for contact/marketing recorded separately; anonymous behavior must not silently identify users.
- Lead stages: new → qualified → contacted → appointment → quoted → application → won/lost; allow authorized transitions.
- Assignment rules: selected agent/referral, department routing, round-robin if configured; no global lead pool visible to all agents.
- Unassigned leads are visible only to authorized routing/admin roles; assigned agent sees only own leads.
- Deduplication, duplicate handling and reassignment with audit history.
- Lead score based on transparent signals (quote request, comparison, appointment), never sensitive profiling by default.

### M12 — Sales CRM & Follow-ups
- Agent dashboard: own assigned customers, permitted contact details, consent, products of interest, interactions, notes, appointments, quote history and tasks.
- Search/filter only within authorized assignments; timeline and follow-up reminders.
- No access to other agents' records through search, direct URL, export, notifications or API parameters.
- Do not store sensitive documents in insecure local cache.

### M13 — Team Lead Dashboard
- Team-only sales totals, targets, conversion funnel, activity counts and agent performance summaries.
- Customer **names only** associated with members of the authorized team; no contact details, personal identifiers beyond necessary display name, medical data, CRM notes or chatbot logs.
- Aggregate results must be scoped server-side; no drill-down to unauthorized customer detail.

### M14 — Department Head Dashboard
- Authorized department-wide sales metrics, agents, teams, customers, lead distribution and pipeline.
- Staff/team hierarchy and lead reassignment with audit trail; customer detail subject to purpose and policy.
- Filters by agent, team, date, product; export only authorized and audited data.

### M15 — Admin Console
- Staff accounts, invitations, roles, teams, department mapping, verified licenses, lead assignment rules.
- Product catalog, rate-table PDF ingestion, publication approval, knowledge base, chatbot feedback, notifications, audit logs, feature flags.
- Content effective dates and four-eyes approval for critical rating changes.
- Role/permission administration separate from routine customer support access.

### M16 — Tasks, Calendar & Notifications
- Follow-up reminders, appointments, overdue tasks, quote viewed alerts, rate-table expiry warnings.
- Notifications reveal only data the recipient is authorized to see; opt-in and preferences for marketing.
- External calendar, LINE, email, SMS and push integrations require separate approval and credentials.

### M17 — Existing Customer Self-Service (Later Phase)
- View own quotes and request updates; policies, payments, renewal and claim status **only** if insurer-authorized APIs or validated imports exist.
- Claims guidance and hospital search sourced from current approved documents; no fabricated live statuses.

### M18 — Reports & Analytics
- Conversion by stage, quote volume, lead response time, sales totals, agent productivity and product interest.
- Each report is permission-scoped; export limits, audit logs and data minimization.
- Define metrics and reporting date/amount basis with stakeholders before implementation.

## Screen Inventory / Navigation
- Public: Home, Product List, Product Detail, Premium Calculator, Compare, Needs Analysis, Chatbot, Request Quote, Book Advisor, FAQ, Privacy.
- Customer: My Requests, My Quotes, My Appointments, Profile, Consent Settings.
- Agent: Dashboard, My Leads, Lead Detail, My Customers, Customer Detail, Quote Builder, Tasks, Calendar, My Profile.
- Team Lead: Team Dashboard, Team Sales, Team Customer Names, Team Roster.
- Department Head: Department Dashboard, All Agents, Authorized Customers, Teams, Assignments, Reports.
- Admin: Users/Roles, Team Hierarchy, Products, PDF Imports, Premium Table Review, Knowledge Base, AI Review, Lead Routing, Reports, Audit Logs, Settings.
- Navigation must hide disallowed screens, but backend authorization is always the security boundary.

## Core User Flows
1. Visitor → product search → calculator → compare → AI explanation → request quote → consent → lead routing → agent follow-up.
2. Admin → upload PDF → parse staging → validate against source → approve/publish → calculator reads active version.
3. Customer → chatbot question → retrieve approved knowledge → cited answer → optional human handoff → assigned agent receives authorized request.
4. Agent → own leads → contact → needs assessment → quote → follow-up → application outcome.
5. Team Lead → team-scoped KPIs → team customer-name list (no details).
6. Department Head → authorized department overview → assignment change → audit event.

## Data Model (conceptual; finalize after database selection)
- organizations(id, name)
- departments(id, organization_id, name)
- teams(id, department_id, lead_user_id)
- users(id, clerk_user_id, organization_id, role, status)
- staff_profiles(user_id, team_id, department_id, license_no, license_expiry, public_profile_fields)
- customers(id, organization_id, owner_user_id, display_name, encrypted_contact_fields, consent_state)
- leads(id, customer_id, assigned_agent_id, source, stage, score, created_at)
- lead_assignments(id, lead_id, from_agent_id, to_agent_id, changed_by, changed_at)
- products(id, organization_id, insurer, type, status)
- product_versions(id, product_id, effective_from, effective_to, approved_by)
- plans(id, product_version_id, benefits_json, conditions_json)
- source_documents(id, product_version_id, file_hash, storage_key, version, approval_status)
- premium_imports(id, source_document_id, status, review_summary)
- premium_rates(id, product_version_id, plan_id, age, sex, occupation_class, frequency, premium, source_page, status)
- quotes(id, customer_id, assigned_agent_id, rate_version_id, quote_snapshot_json, status, expires_at)
- conversations(id, customer_id, assigned_agent_id, consent_scope)
- messages(id, conversation_id, sender, text, source_citations)
- knowledge_entries(id, source_document_id, content, status, effective_dates)
- tasks(id, assigned_agent_id, lead_id, due_at, status)
- appointments(id, customer_id, agent_id, scheduled_at, status)
- sales_records(id, agent_id, customer_id, product_id, amount, reporting_basis, status)
- consents(id, customer_id, purpose, version, granted_at, withdrawn_at)
- audit_events(id, actor_id, action, resource_type, resource_id, timestamp, metadata)
- Add constraints, foreign keys, tenant scopes, retention rules and indexes during backend design. Encrypt sensitive fields at rest.

## API Contract (proposed; authorize every endpoint)
- GET /api/products; GET /api/products/:id; GET /api/plans/:id
- POST /api/premiums/calculate; POST /api/products/compare
- POST /api/needs-assessment; POST /api/chat/messages
- POST /api/quotes; GET /api/quotes/:id; POST /api/quotes/:id/share
- POST /api/leads; GET /api/agent/leads; GET /api/agent/customers/:id; PATCH /api/agent/leads/:id
- GET /api/agent/dashboard; GET /api/team/dashboard; GET /api/team/customer-names
- GET /api/department/dashboard; GET /api/department/customers; POST /api/department/lead-assignments
- POST /api/admin/documents; POST /api/admin/premium-imports/:id/validate; POST /api/admin/premium-imports/:id/publish
- CRUD /api/admin/products; CRUD /api/admin/knowledge; GET /api/admin/audit-events
- Use validated request/response DTOs, pagination, rate limits and standardized errors; never trust client-supplied role, owner_id or organization_id.

## Architecture
Use this folder structure (extend only as needed):
```
app/
  (auth)/
  (tabs)/
  customer/
  agent/
  team/
  department/
  admin/
components/
  ui/
  insurance/
  crm/
constants/
  images.ts
  theme.ts
data/
hooks/
lib/
  api.ts
  clerk.ts
  permissions.ts
store/
  auth-store.ts
  calculator-store.ts
  comparison-store.ts
types/
  product.ts
  quote.ts
  lead.ts
  permissions.ts
assets/
```
- `app/` routes/screens only. Screens compose components and call hooks/stores; no large reusable UI or business logic.
- `components/` reusable UI when clearly useful; examples: PremiumInput, CoverageCard, PlanComparisonTable, QuoteSummary, LeadStatusBadge, SalesKpiCard, ChatMessage, PdfSourceReference.
- `data/` typed static demo content, never masquerading as real insurer rates.
- `store/` Zustand for non-sensitive UI state: selectedPlanIds, calculatorDraft, compareSelections, activeFilters; persist only safe preferences.
- `lib/` API and service helpers; never expose secret keys. Backend authorization and rating logic live server-side.

## UI Rules
For any UI task, replicate provided designs exactly: layout, spacing, padding, font sizes, hierarchy, colors, border radius, shadows, alignment and proportions. Do not approximate or simplify unless asked. If no design is supplied, propose a clean accessible Thai-language mobile-first interface; do not claim an insurer brand affiliation or use protected logos without authorization.

## Styling Rules
- Use NativeWind classes; do not use StyleSheet unless `className` is insufficient.
- Check installed NativeWind version in package.json; do not upgrade without approval.
- Reuse class patterns through global.css.
- Exceptions: SafeAreaView, KeyboardAvoidingView behavior, Modal props, Animated.View dynamic styles, runtime-computed/platform-specific styles, Pressable pressed states, platform shadows.

## Image Rule
- Centralize image imports in `constants/images.ts`; create if absent.
```ts
import mascot from '@/assets/images/mascot.png';
export const images = { mascot };
```
- Screens/components use `images.mascot`, never direct asset imports. Do not assume the image file exists before checking.

## State Management
Zustand for global client state; local state for transient UI; AsyncStorage only for safe preferences. Do not store secrets, sensitive health data or full customer records in AsyncStorage.

## TypeScript
Strict mode, no `any`, typed DTOs, simple readable interfaces and explicit nullable fields.

## Security, Privacy & Insurance Compliance
- Clerk authentication; no custom authentication system. Backend verifies Clerk identity and derives roles from trusted database, never client claims alone.
- Backend RBAC + row/field-level restrictions, tenant isolation, least privilege and object-level authorization on every route.
- Enforce Team Lead customer **name-only** projection at query/serializer layer; forbid indirect detail leaks in analytics, exports, search, chatbot and logs.
- Data minimization, purpose-based consent, access/correction/deletion requests, retention schedule, secure storage and PDPA review before launch.
- Encrypt transport and sensitive stored data; secrets only server-side; rate-limit sensitive endpoints; audit exports and access changes.
- Do not send identifiable personal/health data to an AI provider without approved processing terms and necessary consent/legal basis.
- Quote outputs are indicative unless formally approved; underwriting, claims and policy issuance are insurer-controlled processes.
- Publish only approved product documents and disclose exclusions, waiting periods, assumptions, effective dates and limitations.

## Testing & Acceptance Criteria
- Sales Agent A cannot read Agent B customers by URL, API, search, exports, chat or altered request payload.
- Team Lead sees only team sales totals and team customer names; phone/email/health/notes/quotes are absent from API payloads.
- Department Head cannot access customers outside authorized department/organization.
- Admin cannot publish unverified PDF rates; malformed/missing cells fail safely.
- Premium calculator matches verified table fixtures and handles boundaries (age, occupation, dates, frequency, missing rates).
- Historical quotes preserve original rate version and assumptions.
- Chatbot cites approved knowledge and declines unsupported questions; prompt-injection attempts cannot expand data access.
- Role changes revoke access; lead reassignment moves visibility and writes audit events.
- Customer contact consent and opt-out are honored; no unauthorized notifications.
- Mobile and web flows work; lint, TypeScript checks and feature tests pass.

## Feature Implementation
For each feature: 1. Read Agent.md. 2. Identify files to change. 3. Keep changes focused. 4. Do not rewrite unrelated code. 5. Follow existing patterns. 6. Make feature work end to end. 7. Fix lint/type errors. 8. Test permissions and error states. 9. Summarize changed files and manual test steps.

## Delivery Roadmap
**Phase 0 — Foundations:** confirm business rules, insurer authorization, designs, backend/database choices, data model, permissions, Clerk and audit events.
**Phase 1 — MVP:** public catalog, verified manual rate import, calculator, comparison, quote request, consent, lead assignment, agent CRM, role dashboards.
**Phase 2 — Sales Intelligence:** approved-PDF import/review workflow, chatbot retrieval, needs analysis, quote builder, appointments, notifications, team/department reports.
**Phase 3 — Advanced:** advanced scoring, conversion analytics, existing-customer services and insurer integrations only where authorized.
Build one end-to-end slice at a time; mock unavailable integrations explicitly, never pretend they are live.

## Secrets
Never expose secret keys in client code. Use server routes for tokens, AI calls, PDF ingestion, premium rules and external API access. Never commit credentials or real customer data.

## Authentication
Use Clerk. Do not build custom auth. Authorization remains a separate server-side responsibility.

## Communication
Be concise. Explain what changed, which assumptions remain unverified, and how to test it. Ask approval before adding dependencies or connecting external services.

## Final Reminder
Before every feature: read this file, follow it strictly, build clean simple code, preserve strict role-based customer isolation, verify premium data, and replicate supplied UI designs exactly.
