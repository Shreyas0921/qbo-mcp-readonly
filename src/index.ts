#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RegisterTool } from "./helpers/register-tool.js";
import { QuickbooksMCPServer } from "./server/qbo-mcp-server.js";
import { GetBillPaymentTool } from "./tools/get-bill-payment.tool.js";
import { GetBillTool } from "./tools/get-bill.tool.js";
import { GetCustomerTool } from "./tools/get-customer.tool.js";
import { GetEmployeeTool } from "./tools/get-employee.tool.js";
import { GetEstimateTool } from "./tools/get-estimate.tool.js";
import { GetJournalEntryTool } from "./tools/get-journal-entry.tool.js";
import { GetPurchaseTool } from "./tools/get-purchase.tool.js";
import { GetVendorTool } from "./tools/get-vendor.tool.js";
import { ReadInvoiceTool } from "./tools/read-invoice.tool.js";
import { ReadItemTool } from "./tools/read-item.tool.js";
import { SearchAccountsTool } from "./tools/search-accounts.tool.js";
import { SearchBillPaymentsTool } from "./tools/search-bill-payments.tool.js";
import { SearchBillsTool } from "./tools/search-bills.tool.js";
import { SearchCustomersTool } from "./tools/search-customers.tool.js";
import { SearchEmployeesTool } from "./tools/search-employees.tool.js";
import { SearchEstimatesTool } from "./tools/search-estimates.tool.js";
import { SearchInvoicesTool } from "./tools/search-invoices.tool.js";
import { SearchItemsTool } from "./tools/search-items.tool.js";
import { SearchJournalEntriesTool } from "./tools/search-journal-entries.tool.js";
import { SearchPurchasesTool } from "./tools/search-purchases.tool.js";
import { SearchVendorsTool } from "./tools/search-vendors.tool.js";

const main = async () => {
  // Create an MCP server
  const server = QuickbooksMCPServer.GetServer();
  // Add tools for customers
  RegisterTool(server, GetCustomerTool);
  RegisterTool(server, SearchCustomersTool);

  // Add tools for estimates
  RegisterTool(server, GetEstimateTool);
  RegisterTool(server, SearchEstimatesTool);

  // Add tools for bills
  RegisterTool(server, GetBillTool);
  RegisterTool(server, SearchBillsTool);

  // Add tool to read a single invoice
  RegisterTool(server, ReadInvoiceTool);

  // Add tool to search invoices
  RegisterTool(server, SearchInvoicesTool);

  // Chart of accounts tools
  RegisterTool(server, SearchAccountsTool);

  // Add tool to read item
  RegisterTool(server, ReadItemTool);
  RegisterTool(server, SearchItemsTool);

  // Add tools for vendors
  RegisterTool(server, GetVendorTool);
  RegisterTool(server, SearchVendorsTool);

  // Add tools for employees
  RegisterTool(server, GetEmployeeTool);
  RegisterTool(server, SearchEmployeesTool);

  // Add tools for journal entries
  RegisterTool(server, GetJournalEntryTool);
  RegisterTool(server, SearchJournalEntriesTool);

  // Add tools for bill payments
  RegisterTool(server, GetBillPaymentTool);
  RegisterTool(server, SearchBillPaymentsTool);

  // Add tools for purchases
  RegisterTool(server, GetPurchaseTool);
  RegisterTool(server, SearchPurchasesTool);

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});