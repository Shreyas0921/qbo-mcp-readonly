import { getQuickbooksJournalEntry } from "../handlers/get-quickbooks-journal-entry.handler.js";
import { buildToolErrorResult } from "../helpers/build-tool-error-result.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_journal_entry";
const toolDescription = "Get a journal entry by Id from QuickBooks Online.";

// Define the expected input schema for getting a journal entry
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksJournalEntry(args.params.id);

  if (response.isError) {
  return buildToolErrorResult(toolName, response.error);
}

  return {
    content: [
      { type: "text" as const, text: `Journal entry retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetJournalEntryTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
}; 