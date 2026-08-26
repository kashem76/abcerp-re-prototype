"use server";

import { revalidatePath } from "next/cache";
import {
  createCriterion,
  updateCriterion,
  deleteCriterion,
} from "@/db/queries/criteria";

const CRITERIA_PATH = "/real-estate/settings/land-evaluation/criteria";

export async function createCriterionAction(data: {
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
  await createCriterion(data);
  revalidatePath(CRITERIA_PATH);
}

export async function updateCriterionAction(
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
  await updateCriterion(id, data);
  revalidatePath(CRITERIA_PATH);
}

export async function deleteCriterionAction(id: string): Promise<{ error?: string }> {
  try {
    await deleteCriterion(id);
    revalidatePath(CRITERIA_PATH);
    return {};
  } catch {
    return { error: "Cannot delete — criterion is used in one or more frameworks. Remove it from frameworks first." };
  }
}
