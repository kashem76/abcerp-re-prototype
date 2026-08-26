import { prisma } from "@/lib/prisma";

export async function getSelectionTemplates() {
  return prisma.selectionTemplate.findMany({
    include: {
      criteria: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSelectionTemplateById(id: string) {
  return prisma.selectionTemplate.findUnique({
    where: { id },
    include: {
      criteria: { orderBy: { sortOrder: "asc" } },
    },
  });
}
