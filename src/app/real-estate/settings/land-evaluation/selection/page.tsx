import { getSelectionTemplates } from "@/db/queries/selection";
import SelectionTemplatesClient from "./selection-client";

export default async function SelectionTemplatesPage() {
  const templates = await getSelectionTemplates();

  return (
    <SelectionTemplatesClient
      templates={JSON.parse(JSON.stringify(templates))}
    />
  );
}
