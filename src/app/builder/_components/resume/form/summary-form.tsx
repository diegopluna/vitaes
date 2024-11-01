import { Textarea } from '@/components/ui/textarea'
// import { useResume } from '@/store/resume-store'

// TODO: Maybe add TipTap Editor
export const SummaryForm = () => {
  return (
    <div className="flex px-2">
      <div className="w-full">
        <Textarea id="summary" placeholder="" />
      </div>
    </div>
  )
}
