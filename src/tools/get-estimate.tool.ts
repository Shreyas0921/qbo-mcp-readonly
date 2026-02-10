import { getQuickbooksEstimate } from "../handlers/get-quickbooks-estimate.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "get_estimate";
const toolDescription = "Get an estimate by Id from QuickBooks Online.";
const toolSchema = z.object({ id: z.string() });

const toolHandler = async (args: any) => {
  const response = await getQuickbooksEstimate(args.params.id);
  if (response.isError) {
  return buildToolErrorResult(toolName, response.error);
}
  return {
    content: [
      { type: "text" as const, text: `Estimate:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetEstimateTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 