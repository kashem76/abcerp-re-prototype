import { prisma } from "@/lib/prisma";

export async function getCriteria(filters?: {
  department?: string;
  responseType?: string;
  active?: boolean;
}) {
  return prisma.criterion.findMany({
    where: {
      ...(filters?.department && { category: { department: filters.department } }),
      ...(filters?.responseType && { responseType: filters.responseType }),
      ...(filters?.active !== undefined && { active: filters.active }),
    },
    include: {
      category: true,
      _count: { select: { frameworkCriteria: true } },
    },
    orderBy: { category: { sortOrder: "asc" } },
  });
}

export async function getCriterionById(id: string) {
  return prisma.criterion.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function createCriterion(data: {
  categoryId: string;
  name: string;
  description?: string;
  guidance?: string;
  responseType: string;
  weight: number;
  critical: boolean;
  minimumAcceptable?: number;
  scaleLabels?: string;
  requiredOutputs?: string;
  reportInclusion?: string;
}) {
  return prisma.criterion.create({ data });
}

export async function updateCriterion(
  id: string,
  data: {
    categoryId?: string;
    name?: string;
    description?: string;
    guidance?: string;
    responseType?: string;
    weight?: number;
    critical?: boolean;
    active?: boolean;
    minimumAcceptable?: number | null;
    scaleLabels?: string | null;
    requiredOutputs?: string | null;
    reportInclusion?: string | null;
  }
) {
  return prisma.criterion.update({ where: { id }, data });
}

export async function deleteCriterion(id: string) {
  return prisma.criterion.delete({ where: { id } });
}
