#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RegisterTool } from "./helpers/register-tool.js";
import { QuickbooksMCPServer } from "./server/qbo-mcp-server.js";
import { CreateAccountTool } from "./tools/create-account.tool.js";
import { CreateBillPaymentTool } from "./tools/create-bill-payment.tool.js";
import { CreateBillTool } from "./tools/create-bill.tool.js";
import { CreateCustomerTool } from "./tools/create-customer.tool.js";
import { CreateEmployeeTool } from "./tools/create-employee.tool.js";
import { CreateEstimateTool } from "./tools/create-estimate.tool.js";
import { CreateInvoiceTool } from "./tools/create-invoice.tool.js";
import { CreateItemTool } from "./tools/create-item.tool.js";
import { CreateJournalEntryTool } from "./tools/create-journal-entry.tool.js";
import { CreatePurchaseTool } from "./tools/create-purchase.tool.js";
import { CreateVendorTool } from "./tools/create-vendor.tool.js";
import { DeleteBillPaymentTool } from "./tools/delete-bill-payment.tool.js";
import { DeleteBillTool } from "./tools/delete-bill.tool.js";
import { DeleteCustomerTool } from "./tools/delete-customer.tool.js";
import { DeleteEstimateTool } from "./tools/delete-estimate.tool.js";
import { DeleteJournalEntryTool } from "./tools/delete-journal-entry.tool.js";
import { DeletePurchaseTool } from "./tools/delete-purchase.tool.js";
import { DeleteVendorTool } from "./tools/delete-vendor.tool.js";
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
import { UpdateAccountTool } from "./tools/update-account.tool.js";
import { UpdateBillPaymentTool } from "./tools/update-bill-payment.tool.js";
import { UpdateBillTool } from "./tools/update-bill.tool.js";
import { UpdateCustomerTool } from "./tools/update-customer.tool.js";
import { UpdateEmployeeTool } from "./tools/update-employee.tool.js";
import { UpdateEstimateTool } from "./tools/update-estimate.tool.js";
import { UpdateInvoiceTool } from "./tools/update-invoice.tool.js";
import { UpdateItemTool } from "./tools/update-item.tool.js";
import { UpdateJournalEntryTool } from "./tools/update-journal-entry.tool.js";
import { UpdatePurchaseTool } from "./tools/update-purchase.tool.js";
import { UpdateVendorTool } from "./tools/update-vendor.tool.js";

const main = async () => {
  const server = QuickbooksMCPServer.GetServer();

  // Account tools
  RegisterTool(server, CreateAccountTool);
  RegisterTool(server, SearchAccountsTool);
  RegisterTool(server, UpdateAccountTool);

  // Bill payment tools
  RegisterTool(server, CreateBillPaymentTool);
  RegisterTool(server, DeleteBillPaymentTool);
  RegisterTool(server, GetBillPaymentTool);
  RegisterTool(server, SearchBillPaymentsTool);
  RegisterTool(server, UpdateBillPaymentTool);

  // Bill tools
  RegisterTool(server, CreateBillTool);
  RegisterTool(server, DeleteBillTool);
  RegisterTool(server, GetBillTool);
  RegisterTool(server, SearchBillsTool);
  RegisterTool(server, UpdateBillTool);

  // Customer tools
  RegisterTool(server, CreateCustomerTool);
  RegisterTool(server, DeleteCustomerTool);
  RegisterTool(server, GetCustomerTool);
  RegisterTool(server, SearchCustomersTool);
  RegisterTool(server, UpdateCustomerTool);

  // Employee tools
  RegisterTool(server, CreateEmployeeTool);
  RegisterTool(server, GetEmployeeTool);
  RegisterTool(server, SearchEmployeesTool);
  RegisterTool(server, UpdateEmployeeTool);

  // Estimate tools
  RegisterTool(server, CreateEstimateTool);
  RegisterTool(server, DeleteEstimateTool);
  RegisterTool(server, GetEstimateTool);
  RegisterTool(server, SearchEstimatesTool);
  RegisterTool(server, UpdateEstimateTool);

  // Invoice tools
  RegisterTool(server, CreateInvoiceTool);
  RegisterTool(server, ReadInvoiceTool);
  RegisterTool(server, SearchInvoicesTool);
  RegisterTool(server, UpdateInvoiceTool);

  // Item tools
  RegisterTool(server, CreateItemTool);
  RegisterTool(server, ReadItemTool);
  RegisterTool(server, SearchItemsTool);
  RegisterTool(server, UpdateItemTool);

  // Journal entry tools
  RegisterTool(server, CreateJournalEntryTool);
  RegisterTool(server, DeleteJournalEntryTool);
  RegisterTool(server, GetJournalEntryTool);
  RegisterTool(server, SearchJournalEntriesTool);
  RegisterTool(server, UpdateJournalEntryTool);

  // Purchase tools
  RegisterTool(server, CreatePurchaseTool);
  RegisterTool(server, DeletePurchaseTool);
  RegisterTool(server, GetPurchaseTool);
  RegisterTool(server, SearchPurchasesTool);
  RegisterTool(server, UpdatePurchaseTool);

  // Vendor tools
  RegisterTool(server, CreateVendorTool);
  RegisterTool(server, DeleteVendorTool);
  RegisterTool(server, GetVendorTool);
  RegisterTool(server, SearchVendorsTool);
  RegisterTool(server, UpdateVendorTool);

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
