import { prisma } from "@/lib/prisma";

export async function getFrameworks() {
  return prisma.evaluationFramework.findMany({
    include: {
      sections: {
        include: {
          category: true,
          _count: { select: { criteria: true } },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFrameworkById(id: string) {
  return prisma.evaluationFramework.findUnique({
    where: { id },
    include: {
      sections: {
        include: {
          category: true,
          criteria: {
            include: { criterion: true },
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getDefaultFramework() {
  return prisma.evaluationFramework.findFirst({
    where: { isDefault: true, active: true },
    include: {
      sections: {
        include: {
          category: true,
          criteria: {
            include: { criterion: true },
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}
