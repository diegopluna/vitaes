import { useBuilderTab } from '@/providers/builder-tab-provider'
import { useResumeStore } from '@/providers/resume-store-provider'
import DisplayFrame from '../resume/display-frame'
import ResumeView from '../resume/resume-view'
import { ScrollArea } from '../ui/scroll-area'
import { ResumeForm } from './resume/resume-form'
import { ResumeSettings } from './resume/resume-settings'

export function Builder() {
	const resume = useResumeStore((s) => s.resume)
	const { activeTab } = useBuilderTab()

	return (
		<div className="flex flex-1 flex-row h-[calc(100vh-4rem)]">
			<ScrollArea className="w-1/3 border-r px-6 h-full">
				{activeTab === 'resume' && <ResumeForm />}
				{activeTab === 'settings' && <ResumeSettings />}
			</ScrollArea>
			<ScrollArea className="pl-6 pt-6 w-2/3 flex justify-center">
				<DisplayFrame scale={0.75}>
					<ResumeView resume={resume} />
				</DisplayFrame>
			</ScrollArea>
		</div>
	)
}
