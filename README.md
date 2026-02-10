# QuickBooks Online MCP Server

This is a Model Context Protocol (MCP) server implementation for QuickBooks Online integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
QUICKBOOKS_CLIENT_ID=your_client_id
QUICKBOOKS_CLIENT_SECRET=your_client_secret
QUICKBOOKS_ENVIRONMENT=sandbox
```

3. Get your Client ID and Client Secret:
   - Go to the [Intuit Developer Portal](https://developer.intuit.com/)
   - Create a new app or select an existing one
   - Get the Client ID and Client Secret from the app's keys section
   - Add `http://localhost:8000/callback` to the app's Redirect URIs

## Authentication

There are two ways to authenticate with QuickBooks Online:

### Option 1: Using Environment Variables

If you already have a refresh token and realm ID, you can add them directly to your `.env` file:

```env
QUICKBOOKS_REFRESH_TOKEN=your_refresh_token
QUICKBOOKS_REALM_ID=your_realm_id
```

### Option 2: Using the OAuth Flow

If you don't have a refresh token, you can use the built-in OAuth flow:

This will:
- Start a temporary local server
- Open your default browser automatically
- Redirect you to QuickBooks for authentication
- Save the tokens to your `.env` file once authenticated
- Close automatically when complete

## Usage

After authentication is set up, you can use the MCP server to interact with QuickBooks Online. The server provides various tools for managing customers, estimates, bills, and more.

## Machine-readable tool registry

If another app or AI agent needs a structured tool list, export the registry in the same JSON format returned by `tools/list`:

```bash
npm run export-tools
```

This writes `tools-list.json` with each tool's name, description, and JSON-schema input parameters, which is more reliable than parsing the Markdown list in `READ_ONLY_TOOLS.md`.

## Available Tools

Added tools for Create, Delete, Get, Search, Update for the following entities:


- Account
- Bill Payment
- Bill
- Customer
- Employee
- Estimate
- Invoice
- Item
- Journal Entry
- Purchase
- Vendor


## Error Handling

If you see an error message like "QuickBooks not connected", make sure to:

1. Check that your `.env` file contains all required variables
2. Verify that your tokens are valid and not expired

For MCP tool callers (including AI agents), tool failures are now normalized to a structured envelope.

`structuredContent` on failed tool calls has this shape:

```json
{
  "ok": false,
  "error": {
    "code": "QBO_VALIDATION_FAULT",
    "message": "create-bill: Unsupported Operation",
    "detail": "Operation org.xml.sax.SAXParseException; Premature end of file. is not supported.",
    "retryable": false,
    "provider": "quickbooks",
    "http_status": 500,
    "raw": {}
  }
}
```

MCP error semantics:

1. Failed tool calls return `isError: true`.
2. A human-readable message is present in `content`.
3. A machine-readable envelope is present in `structuredContent`.

Recommended agent behavior:

1. First read `isError`.
2. If `true`, parse `structuredContent.error`.
3. Use `error.retryable` to decide retry vs request-shape fix.
