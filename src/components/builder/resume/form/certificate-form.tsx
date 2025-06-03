import type { Certificate } from '@/@types/resume'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { CertificateSheet } from '../sheet/certificate-sheet'

const certificateKey = Symbol('certificate')

function getCertificateData(certificate: Certificate): ItemData<Certificate> {
	return {
		[certificateKey]: true,
		itemId: certificate.id,
	}
}

function isCertificateData(
	data: Record<string | symbol, unknown>,
): data is ItemData<Certificate> {
	return data[certificateKey] === true
}

const CertificateDragList = DragList<Certificate>

export function CertificateForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)

	const certificates = resume.certificates.content

	function setCertificates(items: Certificate[]) {
		setResumeField('certificates', {
			...resume.certificates,
			content: items,
		})
	}

	return (
		<div className="flex flex-col w-full gap-2 px-2 items-center">
			{certificates.length === 0 && (
				<p className="text-center">
					{m['certificate-form.no-certificates-added']({
						label: resume.certificates.label.toLowerCase(),
					})}
				</p>
			)}
			<CertificateDragList
				items={certificates}
				getItemData={getCertificateData}
				isItemData={isCertificateData}
				setItems={setCertificates}
				EditSheet={CertificateSheet}
				itemType={resume.certificates.label}
				onDelete={(id) => {
					setResumeField('certificates', {
						...resume.certificates,
						content: resume.certificates.content.filter((w) => w.id !== id),
					})
				}}
			/>
		</div>
	)
}
