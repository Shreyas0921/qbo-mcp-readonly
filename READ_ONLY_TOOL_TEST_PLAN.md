# Read-Only MCP Tool Test Plan

## Goal
Thoroughly validate all read-only QuickBooks MCP tools for:
- happy-path behavior
- input validation behavior
- error envelope consistency
- result quality and data integrity

## Scope
Registered read-only tools (from `READ_ONLY_TOOLS.md`):
- `search_accounts`
- `get_bill_payment`
- `search_bill_payments`
- `get-bill`
- `search_bills`
- `get_customer`
- `search_customers`
- `get_employee`
- `search_employees`
- `get_estimate`
- `search_estimates`
- `read_invoice`
- `search_invoices`
- `read_item`
- `search_items`
- `get_journal_entry`
- `search_journal_entries`
- `get_purchase`
- `search_purchases`
- `get-vendor`
- `search_vendors`

## Prerequisites
- [ ] `.env` has valid `QUICKBOOKS_CLIENT_ID`, `QUICKBOOKS_CLIENT_SECRET`, `QUICKBOOKS_ENVIRONMENT`.
- [ ] `.env` has valid `QUICKBOOKS_REFRESH_TOKEN`, `QUICKBOOKS_REALM_ID`.
- [ ] Port `8000` is free if OAuth needs to run.
- [ ] Project builds successfully: `npm run build`.
- [ ] MCP client is configured to launch `dist/index.js` (Node 20+ recommended).

## Test Artifacts To Capture
- [ ] Raw MCP request and response for each test case.
- [ ] `isError` value and `structuredContent` for failures.
- [ ] Tool latency (rough: fast/medium/slow).
- [ ] Any schema/shape mismatches.

## Execution Strategy
1. Run all `search_*` tools first and capture at least one valid ID per entity.
2. Use captured IDs to run corresponding `get_*`/`read_*` tools.
3. Run negative tests (invalid ID, nonexistent ID, bad filter shape) for each tool.
4. Re-run a subset to confirm consistency (non-flaky behavior).

## Common Validation Criteria
- [ ] Success response has `isError != true`.
- [ ] Failure response has `isError: true` and includes `structuredContent.error`.
- [ ] Tool returns entity data for valid IDs (not just metadata text).
- [ ] Returned entity `Id` matches requested ID on get/read tools.
- [ ] Search tools honor key options (`limit`, criteria/filter fields when supported).

## Phase 1: Baseline Smoke (All Tools)
- [ ] `search_accounts` with `limit=5`.
- [ ] `search_bill_payments` with `limit=5`.
- [ ] `search_bills` with `limit=5`.
- [ ] `search_customers` with `limit=5`.
- [ ] `search_employees` with `limit=5`.
- [ ] `search_estimates` with `limit=5`.
- [ ] `search_invoices` with `limit=5`.
- [ ] `search_items` with `limit=5`.
- [ ] `search_journal_entries` with `limit=5`.
- [ ] `search_purchases` with `limit=5`.
- [ ] `search_vendors` with `limit=5`.

## Phase 2: ID Harvest and Mapping
Capture at least one active ID from each entity family.

- [ ] Account ID(s)
- [ ] Bill Payment ID(s)
- [ ] Bill ID(s)
- [ ] Customer ID(s)
- [ ] Employee ID(s)
- [ ] Estimate ID(s)
- [ ] Invoice ID(s)
- [ ] Item ID(s)
- [ ] Journal Entry ID(s)
- [ ] Purchase ID(s)
- [ ] Vendor ID(s)

## Phase 3: Get/Read Tool Deep Validation
Use IDs from Phase 2.

- [ ] `get_bill_payment` with valid ID.
- [ ] `get-bill` with valid ID.
- [ ] `get_customer` with valid ID.
- [ ] `get_employee` with valid ID.
- [ ] `get_estimate` with valid ID.
- [ ] `read_invoice` with valid ID.
- [ ] `read_item` with valid ID.
- [ ] `get_journal_entry` with valid ID.
- [ ] `get_purchase` with valid ID.
- [ ] `get-vendor` with valid ID.

Per-tool checks:
- [ ] Returned object has expected top-level fields (example: `Id`, `MetaData` where applicable).
- [ ] `Id` in payload matches requested ID.
- [ ] No auth errors or transport errors.

## Phase 4: Search Tool Filter/Option Coverage
Run at least 2 targeted queries per search tool:
- one broad query (e.g., `limit=5`)
- one filtered query (entity-specific)

### Suggested filtered tests
- [ ] `search_accounts`: filter by name pattern.
- [ ] `search_bill_payments`: filter by date range or vendor/payment criteria.
- [ ] `search_bills`: filter by `VendorRef` or `TxnDate`.
- [ ] `search_customers`: filter by display name.
- [ ] `search_employees`: filter by name.
- [ ] `search_estimates`: filter by customer/date.
- [ ] `search_invoices`: filter by customer/date.
- [ ] `search_items`: filter by item name/type.
- [ ] `search_journal_entries`: filter by date.
- [ ] `search_purchases`: filter by vendor/date.
- [ ] `search_vendors`: filter by display name.

Option behavior checks:
- [ ] `limit` respected.
- [ ] `offset` behavior verified where supported.
- [ ] sort options (`asc`/`desc`) verified where supported.
- [ ] `count` behavior verified where supported.

## Phase 5: Negative and Edge Cases (All Tools)
For each read/get tool:
- [ ] invalid ID type/format (empty string or malformed).
- [ ] nonexistent ID (well-formed but not present).
- [ ] inactive/deleted entity ID (if available).

For each search tool:
- [ ] invalid filter field/key.
- [ ] invalid operator/value type combinations.
- [ ] extreme `limit` (very high) and small `limit=1`.

Error handling checks:
- [ ] Error is normalized and machine-readable.
- [ ] Message is specific enough for agent retry decisions.
- [ ] `retryable` flag is sensible for auth vs validation vs provider faults.

## Phase 6: Regression/Consistency Pass
- [ ] Re-run 5 representative tools (`search_bills`, `get-bill`, `search_vendors`, `get-vendor`, `read_invoice`) twice.
- [ ] Confirm stable schema and no intermittent parsing/tool wrapper issues.
- [ ] Confirm previously fixed `params.id` behavior for `get-bill` and `get-vendor`.

## Completion Criteria
- [ ] 100% of in-scope tools executed on happy path.
- [ ] 100% of in-scope tools executed on at least one negative case.
- [ ] All failures triaged into: data issue, auth issue, tool bug, or expected provider constraint.
- [ ] Final summary produced with pass/fail counts and open defects.

## Final Report Template
- Test date:
- Environment (`sandbox`/`production`):
- Total tools in scope:
- Happy-path pass:
- Negative-path pass:
- Known failures:
- Suspected code defects:
- Data/setup blockers:
- Recommended fixes:

