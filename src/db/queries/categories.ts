import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return prisma.evaluationCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllCategories() {
  return prisma.evaluationCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { criteria: true } } },
  });
}
