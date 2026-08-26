import StepAssessmentClient from "./step-assessment-client";

export default async function StepAssessmentPage({
  params,
}: {
  params: Promise<{ id: string; stepId: string }>;
}) {
  const { stepId } = await params;

  // The client component still uses its internal stepDataMap for mock response data.
  // When evaluation instances are stored in DB, the server will fetch the actual
  // criterion responses, findings, and evidence from the database and pass them
  // as the `step` prop, overriding the mock data.
  return <StepAssessmentClient stepId={stepId} />;
}
