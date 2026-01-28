# Read-only tools

This file lists the tools in this MCP server that are **read-only** (no Create/Update/Delete mutations).

## Get tools

- **`get-vendor`**: Get a vendor by ID from QuickBooks Online.
- **`get_estimate`**: Get an estimate by Id from QuickBooks Online.
- **`get_employee`**: Get an employee by Id from QuickBooks Online.
- **`get-bill`**: Get a bill by ID from QuickBooks Online.
- **`get_journal_entry`**: Get a journal entry by Id from QuickBooks Online.
- **`get_customer`**: Get a customer by Id from QuickBooks Online.
- **`get_bill_payment`**: Get a bill payment by Id from QuickBooks Online.
- **`get_purchase`**: Get a purchase by Id from QuickBooks Online.

## Read tools

- **`read_item`**: Read a single item in QuickBooks Online by its ID.
- **`read_invoice`**: Read a single invoice from QuickBooks Online by its ID.

## Search tools

- **`search_journal_entries`**: Search journal entries in QuickBooks Online that match given criteria.
- **`search_vendors`**: Search vendors in QuickBooks Online that match given criteria.
- **`search_items`**: Search items in QuickBooks Online using criteria (maps to node-quickbooks findItems).
- **`search_accounts`**: Search chart‑of‑accounts entries using criteria.
- **`search_bill_payments`**: Search bill payments in QuickBooks Online that match given criteria.
- **`search_bills`**: Search bills in QuickBooks Online that match given criteria.
- **`search_invoices`**: Search invoices in QuickBooks Online using criteria (maps to node-quickbooks findInvoices).
- **`search_estimates`**: Search estimates in QuickBooks Online that match given criteria.
- **`search_customers`**: Search customers in QuickBooks Online that match given criteria.
- **`search_employees`**: Search employees in QuickBooks Online that match given criteria.
- **`search_purchases`**: Search purchases in QuickBooks Online that match given criteria.

