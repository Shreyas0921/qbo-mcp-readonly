# Read-Only Tool Access

This server is configured in read-only mode.

Only read-oriented QuickBooks MCP tools are registered in `src/index.ts`.

## Registered Read-Only Tools

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

For an authoritative, machine-readable list of currently exposed tools, run:

```bash
npm run export-tools
```

This generates `tools-list.json` from the live `tools/list` response.
