export function A4Paper({
  children,
  fullPage = false,
}: {
  children: React.ReactNode
  fullPage?: boolean
}) {
  if (fullPage) {
    return (
      <div className=" h-min-[297mm] w-[210mm] pr-[14mm] pl-[14mm] bg-white">
        {children}
      </div>
    )
  }

  return (
    <div className=" h-[297mm] w-[210mm] overflow-y-scroll bg-white pb-[18mm] pt-[8mm] pr-[14mm] pl-[14mm] shadow-lg ">
      {children}
    </div>
  )
}
