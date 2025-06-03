import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeWritings({ resume }: { resume: Resume }) {
	const { awesomeCV: settings } = resume.settings

	return (
		<div className="flex flex-col items-start justify-start w-full mt-4">
			<ResumeSectionHeader
				label={resume.writings.label}
				color={settings.accentColor}
			/>
			<div className="flex flex-col items-start justify-start w-full">
				{resume.writings.content.map((writing) => (
					<div className="w-full" key={writing.id}>
						<div className="flex justify-between w-full">
							<span className="text-md font-bold">{writing.title}</span>
							<span className={`text-xs italic ${settings.accentColor}`}>
								{writing.medium}
							</span>
						</div>
						<div className="flex justify-between w-full">
							<span className="text-xs text-gray-600">
								{writing.role.toUpperCase()}
							</span>
							<span className="text-xs text-gray-500 italic ">
								{writing.startDate}
								{' - '}
								{writing.endDate}
							</span>
						</div>
						<div className="flex ml-4">
							<ul className="flex flex-col list-disc">
								{writing.description.map((description) => (
									<li key={description.id} className="text-xs text-gray-500">
										{description.value}
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
