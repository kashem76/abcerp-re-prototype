import type { ModuleId } from "@/lib/navigation";
import type { GuideTab, ModuleGuide, ScreenGuide } from "./types";

// ─── Module guides ──────────────────────────────────────────
import { executiveGuide } from "./modules/executive";
import { landGuide } from "./modules/land";
import { projectOfficeGuide } from "./modules/project-office";
import { procurementGuide } from "./modules/procurement";
import { siteEngineeringGuide } from "./modules/site-engineering";
import { salesGuide } from "./modules/sales";
import { settingsGuide } from "./modules/settings";

// ─── Screen overrides ───────────────────────────────────────
import { ceoDashboardGuide } from "./screens/ceo-dashboard";
import { cfoDashboardGuide } from "./screens/cfo-dashboard";
import { landPipelineGuide } from "./screens/land-pipeline";
import { landAddGuide } from "./screens/land-add";
import { projectListGuide } from "./screens/project-list";
import { projectNewGuide } from "./screens/project-new";
import { boqGuide } from "./screens/boq";
import { bookingGuide } from "./screens/booking";
import { bookingWizardGuide } from "./screens/booking-wizard";
import { dsrGuide } from "./screens/dsr";
import { runningBillGuide } from "./screens/running-bill";
import { variationGuide } from "./screens/variation";
import { handoverGuide } from "./screens/handover";
import { closureGuide } from "./screens/closure";
import { projectDirectorDashboardGuide } from "./screens/project-director-dashboard";
import { procurementDashboardGuide } from "./screens/procurement-dashboard";
import { salesDashboardGuide } from "./screens/sales-dashboard";
import { siteDashboardGuide } from "./screens/site-dashboard";
import { reportsHubGuide } from "./screens/reports-hub";
import { settingsHubGuide } from "./screens/settings-hub";
import { settingsLifecycleGuide } from "./screens/settings-lifecycle";
import { landEvalFrameworksGuide } from "./screens/land-eval-frameworks";
import { budgetGuide } from "./screens/budget";
import { landDevDashboardGuide } from "./screens/land-dev-dashboard";
import { buyerPortalGuide } from "./screens/buyer-portal";

const moduleGuides: Record<ModuleId, ModuleGuide> = {
  executive: executiveGuide,
  "land-bd": landGuide,
  "project-office": projectOfficeGuide,
  procurement: procurementGuide,
  "site-engineering": siteEngineeringGuide,
  sales: salesGuide,
  settings: settingsGuide,
};

// Ordered by specificity (longest prefix first for correct matching)
const screenGuides: ScreenGuide[] = [
  ceoDashboardGuide,
  cfoDashboardGuide,
  landAddGuide,
  landPipelineGuide,
  projectNewGuide,
  projectListGuide,
  boqGuide,
  bookingWizardGuide,
  bookingGuide,
  dsrGuide,
  runningBillGuide,
  variationGuide,
  handoverGuide,
  closureGuide,
  projectDirectorDashboardGuide,
  procurementDashboardGuide,
  salesDashboardGuide,
  siteDashboardGuide,
  reportsHubGuide,
  settingsLifecycleGuide,
  settingsHubGuide,
  landEvalFrameworksGuide,
  budgetGuide,
  landDevDashboardGuide,
  buyerPortalGuide,
].sort((a, b) => b.route.length - a.route.length);

/**
 * Resolve guide content for a given pathname and module.
 * Screen-level overrides are merged on top of the module-level guide.
 */
export function resolveGuide(
  pathname: string,
  moduleId: ModuleId
): { screenName: string; content: GuideTab } {
  const moduleGuide = moduleGuides[moduleId];

  // Find the most specific screen override
  const screenOverride = screenGuides.find((s) => pathname.startsWith(s.route));

  if (!screenOverride) {
    return {
      screenName: moduleGuide.moduleName,
      content: {
        overview: moduleGuide.overview,
        stories: moduleGuide.stories,
        flow: moduleGuide.flow,
        value: moduleGuide.value,
        technical: moduleGuide.technical,
      },
    };
  }

  // Merge: screen override takes precedence over module defaults
  return {
    screenName: screenOverride.screenName,
    content: {
      overview: screenOverride.overview ?? moduleGuide.overview,
      stories: screenOverride.stories ?? moduleGuide.stories,
      flow: screenOverride.flow ?? moduleGuide.flow,
      value: screenOverride.value ?? moduleGuide.value,
      technical: screenOverride.technical ?? moduleGuide.technical,
    },
  };
}
