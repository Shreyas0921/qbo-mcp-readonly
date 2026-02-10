import { createQuickbooksBill } from "../handlers/create-quickbooks-bill.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "create-bill";
const toolDescription = "Create a bill in QuickBooks Online.";
const toolSchema = z.object({
  bill: z.object({
    Line: z.array(z.object({
      Amount: z.number(),
      DetailType: z.string(),
      Description: z.string(),
      AccountRef: z.object({
        value: z.string(),
        name: z.string().optional(),
      }),
    })),
    VendorRef: z.object({
      value: z.string(),
      name: z.string().optional(),
    }),
    DueDate: z.string(),
    Balance: z.number(),
    TotalAmt: z.number(),
  }),
});

const toolHandler = async (args: { [x: string]: any }) => {
  const response = await createQuickbooksBill(args.bill);

  if (response.isError) {
  return buildToolErrorResult(toolName, response.error);
}

  const bill = response.result;

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(bill),
      }
    ],
  };
};

export const CreateBillTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 