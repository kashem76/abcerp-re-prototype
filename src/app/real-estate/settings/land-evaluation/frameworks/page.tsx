import { getFrameworks } from "@/db/queries/frameworks";
import FrameworkListClient from "./frameworks-client";

export default async function FrameworkListPage() {
  const frameworks = await getFrameworks();

  return (
    <FrameworkListClient
      frameworks={JSON.parse(JSON.stringify(frameworks))}
    />
  );
}
