import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeCertificates({ resume }: { resume: Resume }) {
	const { awesomeCV: settings } = resume.settings
	return (
		<div className="flex flex-col items-start justify-start w-full mt-4">
			<ResumeSectionHeader
				label={resume.certificates.label}
				color={settings.accentColor}
			/>
			<div className="flex flex-col items-start justify-start w-full">
				{resume.certificates.content.map((certificate) => (
					<div className="w-full" key={certificate.id}>
						<div className="flex justify-between w-full">
							<span className="text-md font-bold">{certificate.title}</span>
						</div>
						<div className="flex justify-between w-full">
							<span className="text-sm text-gray-700">
								{certificate.issuer}
							</span>
							<span className="text-xs italic text-gray-500">
								{certificate.date}
							</span>
						</div>
						<div className="flex ml-4">
							<ul className="flex flex-col list-disc">
								{certificate.description?.map((description) => (
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
