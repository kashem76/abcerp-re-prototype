import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding evaluation engine database...");

  // Clear existing data (reverse FK order)
  await prisma.frameworkCriterion.deleteMany();
  await prisma.frameworkSection.deleteMany();
  await prisma.selectionCriterion.deleteMany();
  await prisma.selectionTemplate.deleteMany();
  await prisma.criterion.deleteMany();
  await prisma.evaluationFramework.deleteMany();
  await prisma.evaluationCategory.deleteMany();

  // ═══════════════════════════════════════════════════════════════
  // 1. EVALUATION CATEGORIES
  // ═══════════════════════════════════════════════════════════════

  const categories = await Promise.all([
    prisma.evaluationCategory.create({
      data: { id: "cat-land", name: "Land & Location", description: "Site accessibility, condition, topography, buildable area, utilities, road access", department: "Land / BD", sortOrder: 1 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-legal", name: "Legal", description: "Title verification, chain of ownership, encumbrances, litigation, seller authority", department: "Legal", sortOrder: 2 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-regulatory", name: "Regulatory", description: "Zoning compliance, FAR, height limits, environmental clearance, authority approvals", department: "Planning", sortOrder: 3 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-engineering", name: "Engineering", description: "Soil condition, foundation, construction constraints, cost assessment, technical risk", department: "Engineering", sortOrder: 4 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-market", name: "Market", description: "Market demand, competitive supply, pricing, demographics, infrastructure development", department: "Marketing", sortOrder: 5 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-sales", name: "Sales", description: "Sales velocity, pre-sales potential, payment plans, customer profile, competition impact", department: "Sales", sortOrder: 6 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-financial", name: "Financial", description: "IRR, profit margin, payback period, peak funding, break-even analysis", department: "Finance", sortOrder: 7 },
    }),
    prisma.evaluationCategory.create({
      data: { id: "cat-risk", name: "Risk", description: "Overall risk rating, market risk, execution risk", department: "Management", sortOrder: 8 },
    }),
  ]);

  console.log(`  ✓ ${categories.length} categories created`);

  // ═══════════════════════════════════════════════════════════════
  // 2. CRITERIA LIBRARY
  // ═══════════════════════════════════════════════════════════════

  const ratingScale = JSON.stringify(["Very Poor", "Poor", "Acceptable", "Good", "Excellent"]);
  const fullOutputs = JSON.stringify(["Assessment", "Findings", "Evidence", "Risk", "Recommendation"]);
  const basicOutputs = JSON.stringify(["Assessment", "Findings"]);
  const fullReport = JSON.stringify(["Include score", "Include findings", "Include recommendation"]);
  const basicReport = JSON.stringify(["Include score", "Include findings"]);

  // --- Land & Location criteria ---
  const criteriaData = [
    { id: "C001", categoryId: "cat-land", name: "Site Accessibility", description: "Assess the accessibility of the site for construction equipment and vehicles.", guidance: "Consider road width, turning radius for heavy vehicles, proximity to main roads, and any seasonal access restrictions.", responseType: "Rating", weight: 6, critical: false, scaleLabels: ratingScale, minimumAcceptable: 3, requiredOutputs: fullOutputs, reportInclusion: fullReport },
    { id: "C002", categoryId: "cat-land", name: "Site Condition", description: "Evaluate the existing condition of the site.", guidance: "Assess existing structures, debris, vegetation, drainage patterns, and any demolition requirements.", responseType: "Rating", weight: 5, critical: false, scaleLabels: ratingScale, minimumAcceptable: 3, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C003", categoryId: "cat-land", name: "Topography", description: "Evaluate the terrain and elevation characteristics.", guidance: "Assess slope, elevation changes, flood risk, and impact on construction approach.", responseType: "Rating", weight: 4, critical: false, scaleLabels: ratingScale, minimumAcceptable: 3, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C004", categoryId: "cat-land", name: "Buildable Area", description: "Calculate effective buildable area after setbacks, road widening, and utility easements.", guidance: "Apply local authority setback rules (RAJUK/other). Deduct road widening, drainage easements, and any reserved land.", responseType: "Numeric", weight: 5, critical: false, requiredOutputs: basicOutputs, reportInclusion: JSON.stringify(["Include score"]) },
    { id: "C005", categoryId: "cat-land", name: "Utility Availability", description: "Assess availability and capacity of water, electricity, gas, and sewerage.", guidance: "Check WASA, DESCO/DPDC, Titas Gas connections. Assess capacity for proposed development load.", responseType: "Rating", weight: 4, critical: false, scaleLabels: JSON.stringify(["None Available", "Partial", "Available but Limited", "Good", "Excellent"]), minimumAcceptable: 2, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: basicReport },
    { id: "C006", categoryId: "cat-land", name: "Road Access & Width", description: "Measure road width and assess access quality.", guidance: "Measure road frontage, internal road connections, proximity to arterial roads.", responseType: "Numeric", weight: 6, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },

    // --- Legal criteria ---
    { id: "C007", categoryId: "cat-legal", name: "Ownership Verification", description: "Verify legal ownership of the land through title search and document verification.", guidance: "Check original deed, chain of title (min 25 years), mutation records, encumbrance certificate. Verify NID/TIN of all owners.", responseType: "Pass/Fail", weight: 15, critical: true, requiredOutputs: fullOutputs, reportInclusion: fullReport },
    { id: "C008", categoryId: "cat-legal", name: "Chain of Title", description: "Verify unbroken chain of ownership from original record to current seller.", guidance: "Trace ownership through all transfers. Flag any gaps, disputed transfers, or inheritance without probate.", responseType: "Pass/Fail", weight: 10, critical: true, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: basicReport },
    { id: "C009", categoryId: "cat-legal", name: "Encumbrance Check", description: "Check for any mortgages, liens, or encumbrances on the property.", guidance: "Obtain encumbrance certificate from sub-registrar office. Check for bank mortgages, court orders, or government acquisition notices.", responseType: "Pass/Fail", weight: 10, critical: true, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence", "Risk"]), reportInclusion: fullReport },
    { id: "C010", categoryId: "cat-legal", name: "Mutation Verification", description: "Verify mutation record matches current ownership and deed details.", guidance: "Compare Khatian/Dag/Mouza details in mutation certificate with sale deed. Flag any discrepancies.", responseType: "Pass/Fail", weight: 8, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: basicReport },
    { id: "C011", categoryId: "cat-legal", name: "Litigation Search", description: "Search for any pending or past litigation related to the property.", guidance: "Search court records for cases involving the property, owners, or related parties. Check for civil suits, criminal cases, and revenue court matters.", responseType: "Pass/Fail", weight: 8, critical: true, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence", "Risk"]), reportInclusion: fullReport },
    { id: "C012", categoryId: "cat-legal", name: "Seller Authority", description: "Verify the seller has legal authority to sell the property.", guidance: "Check for power of attorney validity, succession certificates, guardian/minor issues, NRI/foreign ownership restrictions.", responseType: "Pass/Fail", weight: 6, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: basicReport },
    { id: "C013", categoryId: "cat-legal", name: "Power of Attorney", description: "Verify validity of any power of attorney involved in the transaction.", guidance: "Check POA registration, validity period, scope of authority, and whether it covers sale transactions.", responseType: "Pass/Fail", weight: 4, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C014", categoryId: "cat-legal", name: "Succession Certificate", description: "Verify succession certificate if property inherited.", guidance: "Check court-issued succession certificate, verify all legal heirs are accounted for.", responseType: "Pass/Fail", weight: 4, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C015", categoryId: "cat-legal", name: "Government Acquisition Notice", description: "Check for any government acquisition notices affecting the property.", guidance: "Search DC office records, gazette notifications, and any pending acquisition proceedings.", responseType: "Pass/Fail", weight: 5, critical: true, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence", "Risk"]), reportInclusion: fullReport },

    // --- Regulatory criteria ---
    { id: "C016", categoryId: "cat-regulatory", name: "Zoning Compliance", description: "Verify the land can be developed under current zoning and building regulations.", guidance: "Check DAP zoning, FAR limits, height restrictions, environmental clearances, and any government acquisition notices.", responseType: "Pass/Fail", weight: 8, critical: true, requiredOutputs: fullOutputs, reportInclusion: fullReport },
    { id: "C017", categoryId: "cat-regulatory", name: "FAR / Coverage Limit", description: "Determine allowable Floor Area Ratio and ground coverage.", guidance: "Check RAJUK/local authority FAR tables based on road width and zone classification.", responseType: "Numeric", weight: 6, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C018", categoryId: "cat-regulatory", name: "Height Restriction", description: "Determine maximum allowable building height.", guidance: "Check height restrictions from RAJUK, Civil Aviation (if near airport), and local regulations.", responseType: "Numeric", weight: 5, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C019", categoryId: "cat-regulatory", name: "Environmental Clearance", description: "Assess environmental clearance requirements.", guidance: "Check DOE requirements, wetland classification, flood zone status, and any environmental restrictions.", responseType: "Pass/Fail", weight: 6, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: fullReport },
    { id: "C020", categoryId: "cat-regulatory", name: "RAJUK / Authority Approval", description: "Assess likelihood and timeline for planning authority approval.", guidance: "Review RAJUK submission requirements, typical approval timeline, and any pre-conditions.", responseType: "Pass/Fail", weight: 8, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: fullReport },
    { id: "C021", categoryId: "cat-regulatory", name: "Road Widening Impact", description: "Assess impact of any road widening plans on the property.", guidance: "Check road widening proposals from RAJUK, LGED, City Corporation. Calculate land loss if applicable.", responseType: "Numeric", weight: 4, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },

    // --- Engineering criteria ---
    { id: "C022", categoryId: "cat-engineering", name: "Site Accessibility", description: "Assess site accessibility for construction operations.", guidance: "Evaluate access for heavy equipment, material delivery routes, and any restrictions.", responseType: "Rating", weight: 6, critical: false, scaleLabels: ratingScale, minimumAcceptable: 3, requiredOutputs: fullOutputs, reportInclusion: fullReport },
    { id: "C023", categoryId: "cat-engineering", name: "Existing Site Condition", description: "Evaluate current physical condition of the site.", guidance: "Document existing structures, utilities, vegetation, and any demolition requirements.", responseType: "Rating", weight: 5, critical: false, scaleLabels: ratingScale, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C024", categoryId: "cat-engineering", name: "Topography", description: "Detailed topographic assessment for engineering purposes.", guidance: "Survey elevation, slopes, drainage patterns, and flood risk zones.", responseType: "Rating", weight: 4, critical: false, scaleLabels: ratingScale, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C025", categoryId: "cat-engineering", name: "Soil Condition", description: "Evaluate soil bearing capacity and suitability for construction.", guidance: "Review bore-log data if available. Assess soil type, bearing capacity, water table depth, and liquefaction risk.", responseType: "Rating", weight: 7, critical: false, scaleLabels: ratingScale, minimumAcceptable: 2, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence", "Risk", "Cost Estimate"]), reportInclusion: fullReport },
    { id: "C026", categoryId: "cat-engineering", name: "Buildable Area", description: "Calculate buildable area from engineering perspective.", guidance: "Apply structural setbacks, utility easements, and construction clearances.", responseType: "Numeric", weight: 5, critical: false, requiredOutputs: basicOutputs, reportInclusion: JSON.stringify(["Include score"]) },
    { id: "C027", categoryId: "cat-engineering", name: "Utility Availability", description: "Engineering assessment of utility connections.", guidance: "Assess load capacity, connection feasibility, and infrastructure cost for utilities.", responseType: "Rating", weight: 4, critical: false, scaleLabels: ratingScale, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: basicReport },
    { id: "C028", categoryId: "cat-engineering", name: "Foundation Requirement", description: "Assess likely foundation requirements based on soil condition and building load.", guidance: "Consider soil condition, proposed building load, groundwater level, nearby structures. Reference bore-log data if available.", responseType: "Rating", weight: 8, critical: false, scaleLabels: ratingScale, minimumAcceptable: 3, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence", "Risk", "Recommendation", "Cost Estimate"]), reportInclusion: fullReport },
    { id: "C029", categoryId: "cat-engineering", name: "Construction Constraints", description: "Identify physical constraints that may affect construction.", guidance: "Assess adjacent buildings, utility lines, traffic restrictions, noise limits, and seasonal factors.", responseType: "Rating", weight: 5, critical: false, scaleLabels: ratingScale, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Risk"]), reportInclusion: fullReport },
    { id: "C030", categoryId: "cat-engineering", name: "Preliminary Cost Assessment", description: "Initial construction cost estimate based on site conditions.", guidance: "Estimate based on similar projects, adjusted for site-specific factors.", responseType: "Amount", weight: 8, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: fullReport },
    { id: "C031", categoryId: "cat-engineering", name: "Construction Duration", description: "Estimated construction duration in months.", guidance: "Consider building height, number of basements, site constraints, and seasonal factors.", responseType: "Numeric", weight: 4, critical: false, requiredOutputs: basicOutputs, reportInclusion: JSON.stringify(["Include score"]) },
    { id: "C032", categoryId: "cat-engineering", name: "Technical Risk", description: "Overall technical risk assessment for the proposed development.", guidance: "Consider all engineering factors: soil, foundation, access, utilities, construction complexity, environmental hazards.", responseType: "Rating", weight: 5, critical: false, scaleLabels: JSON.stringify(["Critical", "High", "Medium", "Low", "Very Low"]), minimumAcceptable: 3, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Risk", "Recommendation"]), reportInclusion: fullReport },

    // --- Market criteria ---
    { id: "C033", categoryId: "cat-market", name: "Market Demand", description: "Assess current and projected market demand for the proposed development type in this location.", guidance: "Review comparable launches in area, absorption rates, price trends, demographic data, and infrastructure development plans.", responseType: "Rating", weight: 8, critical: false, scaleLabels: JSON.stringify(["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"]), minimumAcceptable: 3, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence", "Recommendation"]), reportInclusion: fullReport },
    { id: "C034", categoryId: "cat-market", name: "Competitive Supply", description: "Analyze existing and upcoming competitive projects.", guidance: "Count comparable projects within 1km radius, their pricing, and absorption rates.", responseType: "Rating", weight: 5, critical: false, scaleLabels: ratingScale, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: fullReport },
    { id: "C035", categoryId: "cat-market", name: "Expected Selling Price", description: "Determine expected selling price per square foot based on market analysis.", guidance: "Compare with recent transactions in 1km radius. Factor in project positioning, amenities, and market trajectory.", responseType: "Amount", weight: 6, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: basicReport },
    { id: "C036", categoryId: "cat-market", name: "Price Trend", description: "Analyze price trends in the area.", guidance: "Review 3-5 year price history, factor in infrastructure developments and economic conditions.", responseType: "Rating", weight: 4, critical: false, scaleLabels: JSON.stringify(["Declining Fast", "Declining", "Stable", "Stable/Up", "Rising"]), requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C037", categoryId: "cat-market", name: "Target Demographic", description: "Define target customer demographic.", guidance: "Assess income levels, occupations, family sizes, and lifestyle preferences of likely buyers.", responseType: "Choice", weight: 3, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C038", categoryId: "cat-market", name: "Infrastructure Development", description: "Assess nearby infrastructure development plans.", guidance: "Check for upcoming roads, metro, commercial zones, hospitals, schools within 2km.", responseType: "Rating", weight: 4, critical: false, scaleLabels: ratingScale, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C039", categoryId: "cat-market", name: "Comparable Projects", description: "Analyze comparable development projects.", guidance: "Identify 3-5 comparable projects. Compare pricing, unit mix, amenities, and sales performance.", responseType: "Rating", weight: 4, critical: false, scaleLabels: ratingScale, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Evidence"]), reportInclusion: fullReport },
    { id: "C040", categoryId: "cat-market", name: "Marketing Complexity", description: "Assess marketing complexity and required investment.", guidance: "Consider location visibility, target audience reach, required marketing channels, and estimated budget.", responseType: "Rating", weight: 3, critical: false, scaleLabels: JSON.stringify(["Very Complex", "Complex", "Standard", "Simple", "Very Simple"]), requiredOutputs: basicOutputs, reportInclusion: basicReport },

    // --- Sales criteria ---
    { id: "C041", categoryId: "cat-sales", name: "Sales Velocity Estimate", description: "Expected unit sales per quarter based on market conditions and project positioning.", guidance: "Reference comparable project sales data in the area. Consider project size, pricing strategy, and market conditions.", responseType: "Numeric", weight: 5, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Recommendation"]), reportInclusion: basicReport },
    { id: "C042", categoryId: "cat-sales", name: "Pre-Sales Potential", description: "Assess potential for pre-launch sales.", guidance: "Evaluate existing customer database, wait-list potential, and location desirability.", responseType: "Rating", weight: 4, critical: false, scaleLabels: JSON.stringify(["Very Low", "Low", "Moderate", "Strong", "Very Strong"]), requiredOutputs: JSON.stringify(["Assessment", "Findings"]), reportInclusion: basicReport },
    { id: "C043", categoryId: "cat-sales", name: "Payment Plan Feasibility", description: "Assess feasibility of standard payment plan.", guidance: "Review standard milestone plan, consider customer payment capacity, and project cash flow needs.", responseType: "Rating", weight: 3, critical: false, scaleLabels: ratingScale, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C044", categoryId: "cat-sales", name: "Customer Profile Match", description: "Assess match between target customers and project positioning.", guidance: "Compare target demographic with company's existing customer base and sales capability.", responseType: "Rating", weight: 3, critical: false, scaleLabels: ratingScale, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C045", categoryId: "cat-sales", name: "Competition Impact", description: "Assess impact of competing projects on sales.", guidance: "Identify competing projects, compare pricing and positioning, and estimate market share impact.", responseType: "Rating", weight: 3, critical: false, scaleLabels: ratingScale, requiredOutputs: basicOutputs, reportInclusion: basicReport },

    // --- Financial criteria ---
    { id: "C046", categoryId: "cat-financial", name: "IRR", description: "Internal Rate of Return of the proposed development project.", guidance: "Calculate based on projected cash flows. Use company-standard discount rate for comparison.", responseType: "Percentage", weight: 10, critical: false, minimumAcceptable: 15, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Recommendation"]), reportInclusion: fullReport },
    { id: "C047", categoryId: "cat-financial", name: "Net Profit Margin", description: "Expected net profit margin after all costs.", guidance: "Calculate (Revenue - Total Cost) / Revenue. Compare against company threshold.", responseType: "Percentage", weight: 8, critical: false, minimumAcceptable: 20, requiredOutputs: JSON.stringify(["Assessment", "Findings"]), reportInclusion: fullReport },
    { id: "C048", categoryId: "cat-financial", name: "Payback Period", description: "Time to recover total investment.", guidance: "Calculate in months from project start to break-even on cumulative cash flow.", responseType: "Numeric", weight: 5, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C049", categoryId: "cat-financial", name: "Peak Funding Requirement", description: "Maximum cash outflow before revenue covers costs.", guidance: "Model month-by-month cash flow. Identify the month with highest cumulative negative cash flow.", responseType: "Amount", weight: 5, critical: false, requiredOutputs: JSON.stringify(["Assessment", "Findings", "Recommendation"]), reportInclusion: fullReport },
    { id: "C050", categoryId: "cat-financial", name: "Break-Even Analysis", description: "Sales percentage needed to break even.", guidance: "Calculate minimum units to sell to cover all costs. Express as % of total units.", responseType: "Numeric", weight: 4, critical: false, requiredOutputs: basicOutputs, reportInclusion: basicReport },
    { id: "C051", categoryId: "cat-financial", name: "Finance Cost Sensitivity", description: "Sensitivity of project returns to interest rate changes.", guidance: "Model impact of ±2% interest rate change on IRR and profit margin.", responseType: "Rating", weight: 4, critical: false, scaleLabels: JSON.stringify(["Very Sensitive", "Sensitive", "Moderate", "Low", "Very Low"]), requiredOutputs: JSON.stringify(["Assessment", "Findings"]), reportInclusion: basicReport },

    // --- Risk criteria ---
    { id: "C052", categoryId: "cat-risk", name: "Overall Risk Rating", description: "Consolidated risk assessment across all departments.", guidance: "Synthesize findings from all department assessments. Weight by impact and probability.", responseType: "Rating", weight: 5, critical: false, scaleLabels: JSON.stringify(["Critical", "High", "Medium", "Low", "Very Low"]), requiredOutputs: JSON.stringify(["Assessment", "Findings", "Risk", "Recommendation"]), reportInclusion: fullReport },
    { id: "C053", categoryId: "cat-risk", name: "Market Risk", description: "Risk of market conditions affecting project viability.", guidance: "Consider demand volatility, price sensitivity, competitive threats, and macroeconomic factors.", responseType: "Rating", weight: 3, critical: false, scaleLabels: JSON.stringify(["Critical", "High", "Medium", "Low", "Very Low"]), requiredOutputs: JSON.stringify(["Assessment", "Findings", "Risk"]), reportInclusion: fullReport },
    { id: "C054", categoryId: "cat-risk", name: "Execution Risk", description: "Risk of construction/execution challenges.", guidance: "Consider contractor availability, material supply, regulatory delays, and technical complexity.", responseType: "Rating", weight: 3, critical: false, scaleLabels: JSON.stringify(["Critical", "High", "Medium", "Low", "Very Low"]), requiredOutputs: JSON.stringify(["Assessment", "Findings", "Risk"]), reportInclusion: fullReport },
  ];

  for (const c of criteriaData) {
    await prisma.criterion.create({ data: c });
  }
  console.log(`  ✓ ${criteriaData.length} criteria created`);

  // ═══════════════════════════════════════════════════════════════
  // 3. EVALUATION FRAMEWORKS
  // ═══════════════════════════════════════════════════════════════

  // --- Standard Land Evaluation ---
  const standardFw = await prisma.evaluationFramework.create({
    data: {
      id: "fw-standard",
      name: "Standard Land Evaluation",
      description: "Full multi-department feasibility study for standard land acquisition or JV. Default framework for all new evaluations.",
      isDefault: true,
      active: true,
    },
  });

  // Section definitions: [categoryId, weight, role, reviewer, deadlineDays, dependsOn]
  const standardSections: {
    id: string; categoryId: string; weight: number; role: string; reviewer: string;
    deadlineDays: number; dependsOn: string | null; criterionIds: string[];
  }[] = [
    { id: "fs-land", categoryId: "cat-land", weight: 10, role: "Land Officer", reviewer: "BD Head", deadlineDays: 2, dependsOn: null, criterionIds: ["C001", "C002", "C003", "C004", "C005", "C006"] },
    { id: "fs-legal", categoryId: "cat-legal", weight: 20, role: "Legal Officer", reviewer: "Head of Legal", deadlineDays: 7, dependsOn: JSON.stringify(["fs-land"]), criterionIds: ["C007", "C008", "C009", "C010", "C011", "C012", "C013", "C014", "C015"] },
    { id: "fs-regulatory", categoryId: "cat-regulatory", weight: 10, role: "Planning Officer", reviewer: "Planning Head", deadlineDays: 10, dependsOn: JSON.stringify(["fs-land"]), criterionIds: ["C016", "C017", "C018", "C019", "C020", "C021"] },
    { id: "fs-engineering", categoryId: "cat-engineering", weight: 20, role: "Engineer", reviewer: "Chief Engineer", deadlineDays: 7, dependsOn: JSON.stringify(["fs-land"]), criterionIds: ["C022", "C023", "C024", "C025", "C026", "C027", "C028", "C029", "C030", "C031", "C032"] },
    { id: "fs-market", categoryId: "cat-market", weight: 15, role: "Analyst", reviewer: "Marketing Head", deadlineDays: 5, dependsOn: null, criterionIds: ["C033", "C034", "C035", "C036", "C037", "C038", "C039", "C040"] },
    { id: "fs-sales", categoryId: "cat-sales", weight: 5, role: "Sales Manager", reviewer: "Sales Head", deadlineDays: 5, dependsOn: JSON.stringify(["fs-market"]), criterionIds: ["C041", "C042", "C043", "C044", "C045"] },
    { id: "fs-financial", categoryId: "cat-financial", weight: 15, role: "Analyst", reviewer: "CFO", deadlineDays: 4, dependsOn: JSON.stringify(["fs-engineering", "fs-market", "fs-sales"]), criterionIds: ["C046", "C047", "C048", "C049", "C050", "C051"] },
    { id: "fs-risk", categoryId: "cat-risk", weight: 5, role: "Coordinator", reviewer: "Director", deadlineDays: 3, dependsOn: JSON.stringify(["fs-engineering", "fs-legal", "fs-financial"]), criterionIds: ["C052", "C053", "C054"] },
  ];

  for (let i = 0; i < standardSections.length; i++) {
    const s = standardSections[i];
    const cat = categories.find((c) => c.id === s.categoryId)!;
    await prisma.frameworkSection.create({
      data: {
        id: s.id,
        frameworkId: standardFw.id,
        categoryId: s.categoryId,
        sortOrder: i + 1,
        weight: s.weight,
        defaultDepartment: cat.department,
        defaultRole: s.role,
        defaultReviewer: s.reviewer,
        defaultDeadlineDays: s.deadlineDays,
        dependsOn: s.dependsOn,
      },
    });

    for (let j = 0; j < s.criterionIds.length; j++) {
      await prisma.frameworkCriterion.create({
        data: {
          frameworkSectionId: s.id,
          criterionId: s.criterionIds[j],
          sortOrder: j + 1,
        },
      });
    }
  }

  // --- JV Evaluation (stub — sections reference same categories) ---
  await prisma.evaluationFramework.create({
    data: {
      id: "fw-jv",
      name: "Joint Venture Evaluation",
      description: "Extended evaluation framework for JV opportunities. Includes additional JV-specific criteria for partner assessment and share negotiation.",
      isDefault: false,
      active: true,
    },
  });

  // --- Commercial Site Evaluation (stub) ---
  await prisma.evaluationFramework.create({
    data: {
      id: "fw-commercial",
      name: "Commercial Site Evaluation",
      description: "Evaluation framework tailored for commercial real estate — office, retail, and mixed-use developments.",
      isDefault: false,
      active: false,
    },
  });

  console.log("  ✓ 3 frameworks created (Standard with full sections + criteria, JV & Commercial as stubs)");

  // ═══════════════════════════════════════════════════════════════
  // 4. SELECTION TEMPLATES
  // ═══════════════════════════════════════════════════════════════

  const st1 = await prisma.selectionTemplate.create({
    data: {
      id: "st-standard",
      name: "Standard Land Selection",
      description: "General residential / commercial land leads. Used as the default quick-screening template for all incoming leads.",
      active: true,
      isDefault: true,
      resultOptions: JSON.stringify(["Qualify", "Hold", "Reject"]),
    },
  });

  const standardSelectionCriteria = [
    { name: "Target Location", category: "Site / Location", responseType: "Choice", weight: 15, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Minimum Land Area", category: "Site / Location", responseType: "Numeric", unit: "Katha", preferred: ">= 20", acceptable: ">= 10", belowStandard: "< 10", weight: 12, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Asking Price / Katha", category: "Financial", responseType: "Amount", unit: "BDT", preferred: "<= 1.2 Cr", acceptable: "<= 1.5 Cr", belowStandard: "> 1.5 Cr", weight: 15, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Road Width", category: "Site / Location", responseType: "Numeric", unit: "ft", preferred: ">= 40", acceptable: ">= 30", belowStandard: "< 30", weight: 10, critical: true, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Owner Willingness", category: "Commercial", responseType: "Rating", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Development Potential", category: "Site / Location", responseType: "Rating", weight: 12, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Known Legal Dispute", category: "Legal", responseType: "Pass/Fail", weight: 10, critical: true, failAction: "reject", department: "Legal", role: "Legal Officer" },
    { name: "Regulatory Red Flag", category: "Regulatory", responseType: "Pass/Fail", weight: 8, critical: true, failAction: "flag", department: "Planning", role: "Planning Officer" },
    { name: "JV Willingness", category: "Commercial", responseType: "Choice", weight: 8, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
  ];

  for (let i = 0; i < standardSelectionCriteria.length; i++) {
    await prisma.selectionCriterion.create({
      data: { templateId: st1.id, sortOrder: i + 1, ...standardSelectionCriteria[i] },
    });
  }

  const st2 = await prisma.selectionTemplate.create({
    data: {
      id: "st-jv",
      name: "JV Opportunity Selection",
      description: "Joint venture land opportunities where the landowner contributes land and the developer builds.",
      active: true,
      isDefault: false,
      resultOptions: JSON.stringify(["Qualify", "Hold", "Reject"]),
    },
  });

  const jvSelectionCriteria = [
    { name: "Target Location", category: "Site / Location", responseType: "Choice", weight: 12, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Minimum Land Area", category: "Site / Location", responseType: "Numeric", unit: "Katha", preferred: ">= 15", acceptable: ">= 8", belowStandard: "< 8", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Owner Share Expectation", category: "Financial", responseType: "Percentage", weight: 15, critical: true, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Road Width", category: "Site / Location", responseType: "Numeric", unit: "ft", preferred: ">= 40", acceptable: ">= 30", belowStandard: "< 30", weight: 8, critical: true, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Number of Owners", category: "Legal", responseType: "Numeric", weight: 8, critical: false, failAction: "flag", department: "Legal", role: "Legal Officer" },
    { name: "Owner Willingness", category: "Commercial", responseType: "Rating", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Known Legal Dispute", category: "Legal", responseType: "Pass/Fail", weight: 10, critical: true, failAction: "reject", department: "Legal", role: "Legal Officer" },
    { name: "Regulatory Red Flag", category: "Regulatory", responseType: "Pass/Fail", weight: 7, critical: true, failAction: "flag", department: "Planning", role: "Planning Officer" },
    { name: "Development Potential", category: "Site / Location", responseType: "Rating", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    { name: "Cash Compensation Required", category: "Financial", responseType: "Amount", unit: "BDT", weight: 5, critical: false, failAction: "flag", department: "Finance", role: "Analyst" },
    { name: "Negotiation Complexity", category: "Commercial", responseType: "Rating", weight: 5, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
  ];

  for (let i = 0; i < jvSelectionCriteria.length; i++) {
    await prisma.selectionCriterion.create({
      data: { templateId: st2.id, sortOrder: i + 1, ...jvSelectionCriteria[i] },
    });
  }

  console.log("  ✓ 2 selection templates created with criteria");

  // ═══════════════════════════════════════════════════════════════
  // DONE
  // ═══════════════════════════════════════════════════════════════

  const counts = {
    categories: await prisma.evaluationCategory.count(),
    criteria: await prisma.criterion.count(),
    frameworks: await prisma.evaluationFramework.count(),
    frameworkSections: await prisma.frameworkSection.count(),
    frameworkCriteria: await prisma.frameworkCriterion.count(),
    selectionTemplates: await prisma.selectionTemplate.count(),
    selectionCriteria: await prisma.selectionCriterion.count(),
  };

  console.log("\nSeed complete:");
  console.log(`  Categories:         ${counts.categories}`);
  console.log(`  Criteria:           ${counts.criteria}`);
  console.log(`  Frameworks:         ${counts.frameworks}`);
  console.log(`  Framework Sections: ${counts.frameworkSections}`);
  console.log(`  Framework Criteria: ${counts.frameworkCriteria}`);
  console.log(`  Selection Templates: ${counts.selectionTemplates}`);
  console.log(`  Selection Criteria: ${counts.selectionCriteria}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
