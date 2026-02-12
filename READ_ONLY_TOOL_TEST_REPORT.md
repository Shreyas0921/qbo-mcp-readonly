# Read-Only Tool Test Report

Generated: 2026-02-12T09:59:18.768Z

## Summary

- Total test cases: 63
- Passed: 63
- Failed: 0
- Skipped: 0

## Harvested IDs

- search_accounts: 69
- search_bill_payments: 118
- search_bills: 126
- search_customers: 1
- search_employees: 55
- search_estimates: 100
- search_invoices: 145
- search_items: 3
- search_journal_entries: 8
- search_purchases: 144
- search_vendors: 56

## Results

| Case | Tool | Expected | Actual | Duration(ms) | Notes |
|---|---|---:|---:|---:|---|
| search-broad | search_accounts | no error | no error | 1563 | Found 5 accounts: |
| search-filtered | search_accounts | no error | no error | 345 | Found 5 accounts: |
| search-negative | search_accounts | error | error | 4 | search_accounts: Invalid input. [
  {
    "code": "invalid_union",
    "unionErrors": [
      {
        "issues": [
          {
            "code": "invalid_type",
            "exp |
| search-broad | search_bill_payments | no error | no error | 307 | Bill payments found: |
| search-filtered | search_bill_payments | no error | no error | 263 | Bill payments found: |
| search-negative | search_bill_payments | error | error | 3 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_bill_payments: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path |
| search-broad | search_bills | no error | no error | 628 | Found 5 bills: |
| search-filtered | search_bills | no error | no error | 801 | Found 5 bills: |
| search-negative | search_bills | error | error | 3 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_bills: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [
    |
| search-broad | search_customers | no error | no error | 274 | Found 5 customers: |
| search-filtered | search_customers | no error | no error | 357 | Found 0 customers: |
| search-negative | search_customers | error | error | 1 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_customers: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [ |
| search-broad | search_employees | no error | no error | 408 | Employees found: |
| search-filtered | search_employees | no error | no error | 366 | Employees found: |
| search-negative | search_employees | error | error | 3 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_employees: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [ |
| search-broad | search_estimates | no error | no error | 455 | Found 4 estimates: |
| search-filtered | search_estimates | no error | no error | 238 | Found 0 estimates: |
| search-negative | search_estimates | error | error | 2 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_estimates: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [ |
| search-broad | search_invoices | no error | no error | 490 | Found 5 invoices |
| search-filtered | search_invoices | no error | no error | 297 | Found 0 invoices |
| search-negative | search_invoices | error | error | 2 | search_invoices: Invalid input. [
  {
    "code": "invalid_union",
    "unionErrors": [
      {
        "issues": [
          {
            "code": "invalid_type",
            "exp |
| search-broad | search_items | no error | no error | 296 | Found 5 items |
| search-filtered | search_items | no error | no error | 228 | Found 0 items |
| search-negative | search_items | error | error | 2 | search_items: Invalid input. [
  {
    "code": "invalid_union",
    "unionErrors": [
      {
        "issues": [
          {
            "code": "invalid_type",
            "expect |
| search-broad | search_journal_entries | no error | no error | 358 | Journal entries found: |
| search-filtered | search_journal_entries | no error | no error | 242 | Journal entries found: |
| search-negative | search_journal_entries | error | error | 2 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_journal_entries: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "pa |
| search-broad | search_purchases | no error | no error | 674 | Purchases found: |
| search-filtered | search_purchases | no error | no error | 523 | Purchases found: |
| search-negative | search_purchases | error | error | 2 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_purchases: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [ |
| search-broad | search_vendors | no error | no error | 281 | Found 5 vendors: |
| search-filtered | search_vendors | no error | no error | 229 | Found 0 vendors: |
| search-negative | search_vendors | error | error | 1 | MCP error -32602: MCP error -32602: Invalid arguments for tool search_vendors: [
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [
  |
| get-happy | get_bill_payment | no error | no error | 275 | id=118; Bill payment retrieved: |
| get-negative-invalid | get_bill_payment | error | error | 202 | get_bill_payment: Unsupported Operation. Operation No resource method found for GET, return 405 with Allow header is not supported. |
| get-negative-nonexistent | get_bill_payment | error | error | 204 | get_bill_payment: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get-bill | no error | no error | 507 | id=126; {"DueDate":"2025-12-23","VendorAddr":{"Id":"40","Line1":"4528 Country Road","City":"Middlefield","CountrySubDivisionCode":"CA","PostalCode":"94303","Lat":"37.3752919","Long |
| get-negative-invalid | get-bill | error | error | 144 | get-bill: Unsupported Operation. Operation operation could not find resource for entity bill is not supported. |
| get-negative-nonexistent | get-bill | error | error | 515 | get-bill: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get_customer | no error | no error | 257 | id=1; Customer: |
| get-negative-invalid | get_customer | error | error | 267 | get_customer: Unsupported Operation. Operation No resource method found for GET, return 405 with Allow header is not supported. |
| get-negative-nonexistent | get_customer | error | error | 194 | get_customer: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get_employee | no error | no error | 327 | id=55; Employee retrieved: |
| get-negative-invalid | get_employee | error | error | 190 | get_employee: Unsupported Operation. Operation No resource method found for GET, return 405 with Allow header is not supported. |
| get-negative-nonexistent | get_employee | error | error | 211 | get_employee: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get_estimate | no error | no error | 447 | id=100; Estimate: |
| get-negative-invalid | get_estimate | error | error | 210 | get_estimate: Unsupported Operation. Operation No resource method found for GET, return 405 with Allow header is not supported. |
| get-negative-nonexistent | get_estimate | error | error | 208 | get_estimate: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | read_invoice | no error | no error | 306 | id=145; Invoice details for ID 145: |
| get-negative-invalid | read_invoice | error | error | 3 | MCP error -32602: MCP error -32602: Invalid arguments for tool read_invoice: [
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exac |
| get-negative-nonexistent | read_invoice | error | error | 205 | read_invoice: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | read_item | no error | no error | 317 | id=3; Item details for ID 3: |
| get-negative-invalid | read_item | error | error | 1 | MCP error -32602: MCP error -32602: Invalid arguments for tool read_item: [
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exact": |
| get-negative-nonexistent | read_item | error | error | 220 | read_item: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get_journal_entry | no error | no error | 306 | id=8; Journal entry retrieved: |
| get-negative-invalid | get_journal_entry | error | error | 257 | get_journal_entry: Unsupported Operation. Operation No resource method found for GET, return 405 with Allow header is not supported. |
| get-negative-nonexistent | get_journal_entry | error | error | 260 | get_journal_entry: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get_purchase | no error | no error | 525 | id=144; Purchase retrieved: |
| get-negative-invalid | get_purchase | error | error | 165 | get_purchase: Unsupported Operation. Operation operation could not find resource for entity purchase is not supported. |
| get-negative-nonexistent | get_purchase | error | error | 371 | get_purchase: Invalid ID. Id should be a valid number. Supplied value:9999999999999 |
| get-happy | get-vendor | no error | no error | 511 | id=56; {"BillAddr":{"Id":"1"},"Balance":0,"BillRate":0,"Vendor1099":false,"CurrencyRef":{"value":"USD","name":"United States Dollar"},"CostRate":0,"domain":"QBO","sparse":false,"Id |
| get-negative-invalid | get-vendor | error | error | 165 | get-vendor: Unsupported Operation. Operation operation could not find resource for entity vendor is not supported. |
| get-negative-nonexistent | get-vendor | error | error | 433 | get-vendor: Object Not Found. Object Not Found : Something you're trying to use has been made inactive. Check the fields with accounts, customers, items, vendors or employees. |


## Failing Cases


## Skipped Cases

