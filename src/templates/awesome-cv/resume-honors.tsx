import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeHonors({ resume }: { resume: Resume }) {
	const { awesomeCV: settings } = resume.settings
	return (
		<div className="flex flex-col items-start justify-start w-full mt-4">
			<ResumeSectionHeader
				label={resume.honors.label}
				color={settings.accentColor}
			/>
			<div className="flex flex-col items-start justify-start w-full">
				{resume.honors.content.map((honorTypes) => (
					<div className="w-full" key={honorTypes.id}>
						<span className="text-md mt-4">
							{honorTypes.label.toUpperCase()}
						</span>
						{honorTypes.honors.map((honor) => (
							<div className="flex justify-between w-full" key={honor.id}>
								<div className="flex flex-row ">
									<span className="text-xs mr-4">{honor.year}</span>
									<span className="text-xs">
										<span className="font-bold">{honor.position}, </span>
										{honor.honor}
									</span>
								</div>
								<span className={`text-xs italic ${settings.accentColor}`}>
									{honor.location}
								</span>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
