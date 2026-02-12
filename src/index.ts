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
  const server = QuickbooksMCPServer.GetServer();

  // Account tools
  RegisterTool(server, SearchAccountsTool);

  // Bill payment tools
  RegisterTool(server, GetBillPaymentTool);
  RegisterTool(server, SearchBillPaymentsTool);

  // Bill tools
  RegisterTool(server, GetBillTool);
  RegisterTool(server, SearchBillsTool);

  // Customer tools
  RegisterTool(server, GetCustomerTool);
  RegisterTool(server, SearchCustomersTool);

  // Employee tools
  RegisterTool(server, GetEmployeeTool);
  RegisterTool(server, SearchEmployeesTool);

  // Estimate tools
  RegisterTool(server, GetEstimateTool);
  RegisterTool(server, SearchEstimatesTool);

  // Invoice tools
  RegisterTool(server, ReadInvoiceTool);
  RegisterTool(server, SearchInvoicesTool);

  // Item tools
  RegisterTool(server, ReadItemTool);
  RegisterTool(server, SearchItemsTool);

  // Journal entry tools
  RegisterTool(server, GetJournalEntryTool);
  RegisterTool(server, SearchJournalEntriesTool);

  // Purchase tools
  RegisterTool(server, GetPurchaseTool);
  RegisterTool(server, SearchPurchasesTool);

  // Vendor tools
  RegisterTool(server, GetVendorTool);
  RegisterTool(server, SearchVendorsTool);

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
