import { deleteQuickbooksVendor } from "../handlers/delete-quickbooks-vendor.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "delete-vendor";
const toolDescription = "Delete a vendor in QuickBooks Online.";
const toolSchema = z.object({
  vendor: z.object({
    Id: z.string(),
    SyncToken: z.string(),
  }),
});

const toolHandler = async (args: { [x: string]: any }) => {
  const response = await deleteQuickbooksVendor(args.vendor);

  if (response.isError) {
  return buildToolErrorResult(toolName, response.error);
}

  const vendor = response.result;

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(vendor),
      }
    ],
  };
};

export const DeleteVendorTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 