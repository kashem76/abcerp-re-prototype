// Mock data for Real Estate ERP Prototype
// All data is static — no database, no API

export const projects = [
  {
    id: "RE-00027",
    name: "ABC Nasirabad Heights",
    location: "Nasirabad, Chattogram",
    stage: "CONSTRUCTION",
    status: "ACTIVE",
    totalBudget: 700_000_000,
    actualCost: 285_000_000,
    committedCost: 145_000_000,
    forecastCost: 455_000_000,
    totalRevenue: 950_000_000,
    recognizedRevenue: 380_000_000,
    totalUnits: 48,
    soldUnits: 32,
    bookedUnits: 6,
    availableUnits: 4,
    landownerUnits: 6,
    collectionEfficiency: 87,
    completionPercent: 64,
    startDate: "2025-03-01",
    expectedEnd: "2027-12-31",
    manager: "Eng. Kamal Hossain",
    healthScore: 76,
  },
  {
    id: "RE-00031",
    name: "Bay View Residence",
    location: "Patenga, Chattogram",
    stage: "SALES_COLLECTION",
    status: "ACTIVE",
    totalBudget: 440_000_000,
    actualCost: 361_000_000,
    committedCost: 52_000_000,
    forecastCost: 451_000_000,
    totalRevenue: 620_000_000,
    recognizedRevenue: 508_000_000,
    totalUnits: 36,
    soldUnits: 30,
    bookedUnits: 3,
    availableUnits: 3,
    landownerUnits: 0,
    collectionEfficiency: 92,
    completionPercent: 82,
    startDate: "2024-06-15",
    expectedEnd: "2027-03-31",
    manager: "Eng. Rafiq Ahmed",
    healthScore: 88,
  },
  {
    id: "RE-00035",
    name: "Green Valley Township",
    location: "Hathazari, Chattogram",
    stage: "BOQ_ESTIMATION",
    status: "ACTIVE",
    totalBudget: 580_000_000,
    actualCost: 42_000_000,
    committedCost: 0,
    forecastCost: 612_000_000,
    totalRevenue: 780_000_000,
    recognizedRevenue: 0,
    totalUnits: 72,
    soldUnits: 8,
    bookedUnits: 14,
    availableUnits: 40,
    landownerUnits: 10,
    collectionEfficiency: 0,
    completionPercent: 0,
    startDate: "2026-01-01",
    expectedEnd: "2029-06-30",
    manager: "Eng. Nasir Uddin",
    healthScore: 92,
  },
];

export const projectDetail = {
  id: "RE-00027",
  name: "ABC Nasirabad Heights",
  location: "Nasirabad, Chattogram",
  stage: "CONSTRUCTION",
  phases: [
    { name: "Foundation", budget: 85_000_000, actual: 82_000_000, progress: 100, status: "COMPLETED" },
    { name: "Structure", budget: 180_000_000, actual: 142_000_000, progress: 72, status: "IN_PROGRESS" },
    { name: "MEP", budget: 72_000_000, actual: 28_000_000, progress: 35, status: "IN_PROGRESS" },
    { name: "Finishing", budget: 55_000_000, actual: 18_000_000, progress: 22, status: "IN_PROGRESS" },
    { name: "External Works", budget: 18_000_000, actual: 5_000_000, progress: 10, status: "NOT_STARTED" },
    { name: "Handover", budget: 10_000_000, actual: 0, progress: 0, status: "NOT_STARTED" },
  ],
  alerts: [
    { type: "CRITICAL", message: "Steel price increased 8.2% — forecast cost impact +BDT 12.4m" },
    { type: "WARNING", message: "Tower B structural work 31 days behind schedule" },
    { type: "WARNING", message: "3 buyer installments overdue > 60 days (BDT 4.2m)" },
    { type: "INFO", message: "12,500 excess tiles available — transfer from Bay View possible" },
  ],
};

export const units = [
  { code: "A-101", type: "3BR", size: 1450, floor: 1, block: "A", facing: "South", price: 8_700_000, pricePerSft: 6_000, status: "SOLD", buyer: "Mr. Rahman" },
  { code: "A-102", type: "2BR", size: 1050, floor: 1, block: "A", facing: "North", price: 5_775_000, pricePerSft: 5_500, status: "SOLD", buyer: "Mrs. Akter" },
  { code: "A-201", type: "3BR", size: 1450, floor: 2, block: "A", facing: "South", price: 8_845_000, pricePerSft: 6_100, status: "BOOKED", buyer: "Mr. Islam" },
  { code: "A-202", type: "2BR", size: 1050, floor: 2, block: "A", facing: "North", price: 5_880_000, pricePerSft: 5_600, status: "UNDER_PAYMENT", buyer: "Mr. Hasan" },
  { code: "A-301", type: "3BR", size: 1450, floor: 3, block: "A", facing: "South", price: 8_990_000, pricePerSft: 6_200, status: "LANDOWNER", buyer: "Landowner" },
  { code: "A-302", type: "2BR", size: 1050, floor: 3, block: "A", facing: "North", price: 5_985_000, pricePerSft: 5_700, status: "AVAILABLE", buyer: null },
  { code: "A-401", type: "3BR", size: 1450, floor: 4, block: "A", facing: "South", price: 9_135_000, pricePerSft: 6_300, status: "SOLD", buyer: "Mr. Chowdhury" },
  { code: "A-402", type: "2BR", size: 1050, floor: 4, block: "A", facing: "North", price: 6_090_000, pricePerSft: 5_800, status: "RESERVED", buyer: "Pending" },
  { code: "A-501", type: "3BR", size: 1450, floor: 5, block: "A", facing: "South", price: 9_280_000, pricePerSft: 6_400, status: "LANDOWNER", buyer: "Landowner" },
  { code: "A-502", type: "2BR", size: 1050, floor: 5, block: "A", facing: "North", price: 6_195_000, pricePerSft: 5_900, status: "SOLD", buyer: "Mrs. Begum" },
  { code: "A-601", type: "3BR", size: 1450, floor: 6, block: "A", facing: "South", price: 9_425_000, pricePerSft: 6_500, status: "AVAILABLE", buyer: null },
  { code: "A-602", type: "2BR", size: 1050, floor: 6, block: "A", facing: "North", price: 6_300_000, pricePerSft: 6_000, status: "AVAILABLE", buyer: null },
];

export const paymentSchedule = [
  { installment: 1, type: "Booking Money", dueDate: "2026-01-15", amount: 500_000, status: "PAID", paidDate: "2026-01-14", paidAmount: 500_000 },
  { installment: 2, type: "Down Payment", dueDate: "2026-02-15", amount: 1_200_000, status: "PAID", paidDate: "2026-02-12", paidAmount: 1_200_000 },
  { installment: 3, type: "Installment 1", dueDate: "2026-03-15", amount: 500_000, status: "PAID", paidDate: "2026-03-15", paidAmount: 500_000 },
  { installment: 4, type: "Installment 2", dueDate: "2026-04-15", amount: 500_000, status: "PAID", paidDate: "2026-04-18", paidAmount: 500_000 },
  { installment: 5, type: "Installment 3", dueDate: "2026-05-15", amount: 500_000, status: "PAID", paidDate: "2026-05-14", paidAmount: 500_000 },
  { installment: 6, type: "Installment 4", dueDate: "2026-06-15", amount: 500_000, status: "PAID", paidDate: "2026-06-16", paidAmount: 500_000 },
  { installment: 7, type: "Installment 5", dueDate: "2026-07-15", amount: 500_000, status: "OVERDUE", paidDate: null, paidAmount: 0 },
  { installment: 8, type: "Installment 6", dueDate: "2026-08-15", amount: 500_000, status: "DUE", paidDate: null, paidAmount: 0 },
  { installment: 9, type: "Installment 7", dueDate: "2026-09-15", amount: 500_000, status: "UPCOMING", paidDate: null, paidAmount: 0 },
  { installment: 10, type: "Installment 8", dueDate: "2026-10-15", amount: 500_000, status: "UPCOMING", paidDate: null, paidAmount: 0 },
  { installment: 11, type: "On Handover", dueDate: "2027-12-31", amount: 1_500_000, status: "UPCOMING", paidDate: null, paidAmount: 0 },
  { installment: 12, type: "On Registration", dueDate: "2028-03-31", amount: 500_000, status: "UPCOMING", paidDate: null, paidAmount: 0 },
  { installment: 13, type: "Utility Charge", dueDate: "2028-03-31", amount: 200_000, status: "UPCOMING", paidDate: null, paidAmount: 0 },
];

export const boqItems = [
  { code: "FND-001", wbs: "Tower A > Foundation > Earthwork", item: "Excavation", qty: 2500, uom: "CFT", rate: 45, amount: 112_500, actualQty: 2680, actualRate: 48, actualAmount: 128_640, variance: 14.3 },
  { code: "FND-002", wbs: "Tower A > Foundation > Pile", item: "Pile Work (RCC)", qty: 45, uom: "NOS", rate: 28_000, amount: 1_260_000, actualQty: 45, actualRate: 31_200, actualAmount: 1_404_000, variance: 11.4 },
  { code: "STR-001", wbs: "Tower A > Structure > RCC Column", item: "RCC Column Work", qty: 850, uom: "CFT", rate: 625, amount: 531_250, actualQty: 620, actualRate: 648, actualAmount: 401_760, variance: -3.5 },
  { code: "STR-002", wbs: "Tower A > Structure > RCC Beam", item: "RCC Beam Work", qty: 1200, uom: "CFT", rate: 610, amount: 732_000, actualQty: 890, actualRate: 635, actualAmount: 565_150, variance: -1.8 },
  { code: "STR-003", wbs: "Tower A > Structure > Slab", item: "RCC Slab Work", qty: 3200, uom: "SFT", rate: 450, amount: 1_440_000, actualQty: 2100, actualRate: 468, actualAmount: 982_800, variance: 4.0 },
  { code: "STR-004", wbs: "Tower A > Structure > Brick", item: "Brickwork (5\" wall)", qty: 18000, uom: "SFT", rate: 85, amount: 1_530_000, actualQty: 12500, actualRate: 88, actualAmount: 1_100_000, variance: 3.5 },
  { code: "MEP-001", wbs: "Tower A > MEP > Electrical", item: "Electrical Wiring", qty: 48, uom: "UNIT", rate: 45_000, amount: 2_160_000, actualQty: 18, actualRate: 47_000, actualAmount: 846_000, variance: 4.4 },
  { code: "FIN-001", wbs: "Tower A > Finishing > Plaster", item: "Internal Plastering", qty: 42000, uom: "SFT", rate: 35, amount: 1_470_000, actualQty: 8500, actualRate: 37, actualAmount: 314_500, variance: 5.7 },
];

export const runningBill = {
  billNumber: "RA-003",
  contractor: "M/S Reliable Construction",
  contract: "CT-RE27-001 (Civil Works — Tower A Structure)",
  contractValue: 145_000_000,
  billDate: "2026-08-05",
  periodFrom: "2026-07-01",
  periodTo: "2026-07-31",
  lines: [
    { item: "RCC Column Work", unit: "CFT", contractQty: 850, cumMeasured: 620, prevBilled: 480, currentBilled: 140, rate: 648, grossAmount: 90_720 },
    { item: "RCC Beam Work", unit: "CFT", contractQty: 1200, cumMeasured: 890, prevBilled: 650, currentBilled: 240, rate: 635, grossAmount: 152_400 },
    { item: "RCC Slab Work", unit: "SFT", contractQty: 3200, cumMeasured: 2100, prevBilled: 1800, currentBilled: 300, rate: 468, grossAmount: 140_400 },
  ],
  summary: {
    grossAmount: 8_000_000,
    cumulativeGross: 62_000_000,
    retention: 800_000,
    advanceRecovery: 200_000,
    tdsWithholding: 200_000,
    materialSupplied: 150_000,
    totalDeductions: 1_350_000,
    netPayable: 6_650_000,
  },
};

export const dsrData = {
  date: "2026-08-12",
  weather: "Partly Cloudy, 32°C",
  siteEngineer: "Eng. Masud Rana",
  manpower: [
    { trade: "Mason", own: 12, contractor: 28 },
    { trade: "Helper", own: 8, contractor: 45 },
    { trade: "Rod Binder", own: 0, contractor: 18 },
    { trade: "Carpenter", own: 4, contractor: 12 },
    { trade: "Electrician", own: 2, contractor: 8 },
    { trade: "Plumber", own: 0, contractor: 6 },
    { trade: "Painter", own: 0, contractor: 0 },
    { trade: "Supervisor", own: 3, contractor: 5 },
  ],
  equipment: [
    { name: "Tower Crane", hoursUsed: 8, idleHours: 0, status: "ACTIVE" },
    { name: "Concrete Mixer", hoursUsed: 6, idleHours: 2, status: "ACTIVE" },
    { name: "Bar Bending Machine", hoursUsed: 7, idleHours: 1, status: "ACTIVE" },
    { name: "Vibrator", hoursUsed: 5, idleHours: 3, status: "ACTIVE" },
    { name: "Hoist", hoursUsed: 8, idleHours: 0, status: "ACTIVE" },
    { name: "Pump (dewatering)", hoursUsed: 0, idleHours: 8, status: "IDLE" },
  ],
  workDone: [
    { wbs: "Tower A > Structure > Level 8", activity: "RCC Column casting", qty: 12, uom: "NOS", remarks: "All 12 columns cast. Vibration done." },
    { wbs: "Tower A > Structure > Level 7", activity: "Beam shuttering", qty: 180, uom: "RFT", remarks: "Shuttering for L7 beams in progress" },
    { wbs: "Tower A > MEP > Level 5-6", activity: "Electrical conduit laying", qty: 320, uom: "RFT", remarks: "Conduit for 2 floors completed" },
    { wbs: "Tower A > Finishing > Level 1-2", activity: "Internal plastering", qty: 1200, uom: "SFT", remarks: "Ground and 1st floor plastering ongoing" },
  ],
  issues: [
    { severity: "HIGH", description: "Rod delivery delayed by supplier — expected 3 days late. May impact Level 9 column schedule.", action: "Contacted alternative supplier" },
    { severity: "MEDIUM", description: "Plumbing contractor manpower shortage — only 6 workers instead of 12", action: "Contractor to deploy additional team by Thursday" },
  ],
};

export const feasibility = {
  opportunityCode: "OPP-00041",
  projectName: "ABC Nasirabad Heights",
  location: "Nasirabad, Chattogram",
  landArea: "42 Katha",
  far: 6.5,
  saleableArea: 150_000,
  totalUnits: 48,
  revenue: {
    apartments: 850_000_000,
    parking: 25_000_000,
    commercial: 40_000_000,
    utility: 35_000_000,
    total: 950_000_000,
  },
  cost: {
    land: 180_000_000,
    construction: 420_000_000,
    consultant: 22_000_000,
    statutory: 8_000_000,
    marketing: 18_000_000,
    finance: 24_000_000,
    contingency: 32_000_000,
    total: 704_000_000,
  },
  metrics: {
    profit: 246_000_000,
    grossMargin: 25.9,
    roi: 34.9,
    irr: 22.3,
    npv: 185_000_000,
    paybackMonths: 36,
    costPerSft: 4_693,
    revenuePerSft: 6_333,
    breakEvenUnits: 35,
    breakEvenPercent: 73,
  },
  scenarios: [
    { name: "Optimistic", revenue: 1_020_000_000, cost: 680_000_000, profit: 340_000_000, margin: 33.3, irr: 28.1 },
    { name: "Base Case", revenue: 950_000_000, cost: 704_000_000, profit: 246_000_000, margin: 25.9, irr: 22.3 },
    { name: "Conservative", revenue: 880_000_000, cost: 735_000_000, profit: 145_000_000, margin: 16.5, irr: 14.7 },
  ],
};

export const budgetVsActual = [
  { category: "Foundation", budget: 85_000_000, actual: 82_000_000, committed: 0, forecast: 82_000_000, variance: -3_000_000, variancePct: -3.5 },
  { category: "Structure", budget: 180_000_000, actual: 142_000_000, committed: 28_000_000, forecast: 188_000_000, variance: 8_000_000, variancePct: 4.4 },
  { category: "MEP", budget: 72_000_000, actual: 28_000_000, committed: 35_000_000, forecast: 74_000_000, variance: 2_000_000, variancePct: 2.8 },
  { category: "Finishing", budget: 55_000_000, actual: 18_000_000, committed: 12_000_000, forecast: 56_000_000, variance: 1_000_000, variancePct: 1.8 },
  { category: "External Works", budget: 18_000_000, actual: 5_000_000, committed: 8_000_000, forecast: 19_000_000, variance: 1_000_000, variancePct: 5.6 },
  { category: "Handover", budget: 10_000_000, actual: 0, committed: 0, forecast: 10_000_000, variance: 0, variancePct: 0 },
  { category: "Consultant", budget: 22_000_000, actual: 10_000_000, committed: 12_000_000, forecast: 24_000_000, variance: 2_000_000, variancePct: 9.1 },
  { category: "Marketing", budget: 18_000_000, actual: 8_000_000, committed: 5_000_000, forecast: 18_000_000, variance: 0, variancePct: 0 },
];

export const buyerPortalData = {
  buyer: { name: "Mr. Hasanul Islam", phone: "01711-XXXXXX", email: "hasan@email.com" },
  unit: { code: "A-201", type: "3BR Apartment", size: "1,450 SFT", floor: "2nd Floor", block: "Tower A", facing: "South" },
  booking: { code: "BK-RE27-008", date: "2026-01-10", agreementValue: 8_700_000, totalPaid: 3_700_000, balance: 5_000_000, nextDue: "2026-08-15", nextAmount: 500_000 },
  progress: { overall: 64, foundation: 100, structure: 72, mep: 35, finishing: 22 },
  milestones: [
    { name: "Foundation Complete", date: "2025-11-15", status: "DONE" },
    { name: "Structure 50%", date: "2026-04-30", status: "DONE" },
    { name: "Structure 100%", date: "2026-10-31", status: "IN_PROGRESS" },
    { name: "MEP Complete", date: "2027-03-31", status: "UPCOMING" },
    { name: "Finishing Complete", date: "2027-09-30", status: "UPCOMING" },
    { name: "Handover", date: "2027-12-31", status: "UPCOMING" },
  ],
};

// Helper
export function formatBDT(amount: number): string {
  if (amount >= 10_000_000) return `${(amount / 10_000_000).toFixed(1)} Cr`;
  if (amount >= 100_000) return `${(amount / 100_000).toFixed(1)} L`;
  return new Intl.NumberFormat("en-BD").format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-BD").format(n);
}
