import { notFound } from "next/navigation";
import { getFrameworkById } from "@/db/queries/frameworks";
import FrameworkBuilderClient from "./framework-builder-client";

export default async function FrameworkBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const framework = await getFrameworkById(id);

  if (!framework) {
    notFound();
  }

  return (
    <FrameworkBuilderClient
      framework={JSON.parse(JSON.stringify(framework))}
    />
  );
}
