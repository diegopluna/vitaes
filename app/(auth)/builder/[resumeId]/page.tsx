export default async function Page({
  params,
}: {
  params: Promise<{ resumeId: string }>
}) {
  const { resumeId } = await params
  return <div>{resumeId}</div>
}
