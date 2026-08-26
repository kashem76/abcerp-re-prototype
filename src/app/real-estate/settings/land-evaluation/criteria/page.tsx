import { getCriteria } from "@/db/queries/criteria";
import { getCategories } from "@/db/queries/categories";
import CriteriaLibraryClient from "./criteria-client";

export default async function CriteriaLibraryPage() {
  const [criteria, categories] = await Promise.all([
    getCriteria(),
    getCategories(),
  ]);

  return (
    <CriteriaLibraryClient
      criteria={JSON.parse(JSON.stringify(criteria))}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
}
