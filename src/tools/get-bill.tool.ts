import { getQuickbooksBill } from "../handlers/get-quickbooks-bill.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "get-bill";
const toolDescription = "Get a bill by ID from QuickBooks Online.";
const toolSchema = z.object({
  id: z.string(),
});

const toolHandler = async (args: { [x: string]: any }) => {
  const response = await getQuickbooksBill(args.id);

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

export const GetBillTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 