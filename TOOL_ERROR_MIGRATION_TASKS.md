# Per-Tool Error Migration Tasks

## Goal
Migrate each tool to emit structured, agent-friendly errors directly from the tool implementation (instead of relying on legacy text parsing).

## Definition Of Done (per tool)
- Return a structured failure envelope in tool output (`ok: false`, `error.code`, `error.message`, `error.detail`, `error.retryable`, `error.provider`, `error.http_status`, `error.raw`).
- Set MCP error semantics consistently (`isError: true`) on failure.
- Remove ad-hoc string-only error formatting such as `Error ...: ${response.error}` as the primary error signal.
- Ensure success responses remain unchanged in behavior.
- Add/update tests for at least one representative failure path for the tool.

## Task List
- [x] `src/tools/create-account.tool.ts`
- [x] `src/tools/create-bill-payment.tool.ts`
- [x] `src/tools/create-bill.tool.ts`
- [x] `src/tools/create-customer.tool.ts`
- [x] `src/tools/create-employee.tool.ts`
- [x] `src/tools/create-estimate.tool.ts`
- [x] `src/tools/create-invoice.tool.ts`
- [x] `src/tools/create-item.tool.ts`
- [x] `src/tools/create-journal-entry.tool.ts`
- [x] `src/tools/create-purchase.tool.ts`
- [x] `src/tools/create-vendor.tool.ts`
- [x] `src/tools/delete-bill-payment.tool.ts`
- [x] `src/tools/delete-bill.tool.ts`
- [x] `src/tools/delete-customer.tool.ts`
- [x] `src/tools/delete-estimate.tool.ts`
- [x] `src/tools/delete-journal-entry.tool.ts`
- [x] `src/tools/delete-purchase.tool.ts`
- [x] `src/tools/delete-vendor.tool.ts`
- [x] `src/tools/get-bill-payment.tool.ts`
- [x] `src/tools/get-bill.tool.ts`
- [x] `src/tools/get-customer.tool.ts`
- [x] `src/tools/get-employee.tool.ts`
- [x] `src/tools/get-estimate.tool.ts`
- [x] `src/tools/get-journal-entry.tool.ts`
- [x] `src/tools/get-purchase.tool.ts`
- [x] `src/tools/get-vendor.tool.ts`
- [x] `src/tools/read-invoice.tool.ts`
- [x] `src/tools/read-item.tool.ts`
- [x] `src/tools/search-accounts.tool.ts`
- [x] `src/tools/search-bill-payments.tool.ts`
- [x] `src/tools/search-bills.tool.ts`
- [x] `src/tools/search-customers.tool.ts`
- [x] `src/tools/search-employees.tool.ts`
- [x] `src/tools/search-estimates.tool.ts`
- [x] `src/tools/search-invoices.tool.ts`
- [x] `src/tools/search-items.tool.ts`
- [x] `src/tools/search-journal-entries.tool.ts`
- [x] `src/tools/search-purchases.tool.ts`
- [x] `src/tools/search-vendors.tool.ts`
- [x] `src/tools/update-account.tool.ts`
- [x] `src/tools/update-bill-payment.tool.ts`
- [x] `src/tools/update-bill.tool.ts`
- [x] `src/tools/update-customer.tool.ts`
- [x] `src/tools/update-employee.tool.ts`
- [x] `src/tools/update-estimate.tool.ts`
- [x] `src/tools/update-invoice.tool.ts`
- [x] `src/tools/update-item.tool.ts`
- [x] `src/tools/update-journal-entry.tool.ts`
- [x] `src/tools/update-purchase.tool.ts`
- [x] `src/tools/update-vendor.tool.ts`
