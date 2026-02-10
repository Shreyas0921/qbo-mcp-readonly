import { getQuickbooksBillPayment } from "../handlers/get-quickbooks-bill-payment.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_bill_payment";
const toolDescription = "Get a bill payment by Id from QuickBooks Online.";

// Define the expected input schema for getting a bill payment
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksBillPayment(args.params.id);

  if (response.isError) {
  return buildToolErrorResult(toolName, response.error);
}

  return {
    content: [
      { type: "text" as const, text: `Bill payment retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetBillPaymentTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 