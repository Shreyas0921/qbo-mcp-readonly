import { deleteQuickbooksBill } from "../handlers/delete-quickbooks-bill.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "delete-bill";
const toolDescription = "Delete a bill in QuickBooks Online.";
const toolSchema = z.object({
  bill: z.object({
    Id: z.string(),
    SyncToken: z.string(),
  }),
});

const toolHandler = async (args: { [x: string]: any }) => {
  const response = await deleteQuickbooksBill(args.bill);

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

export const DeleteBillTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 