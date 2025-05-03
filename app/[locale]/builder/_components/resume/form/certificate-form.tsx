'use client'

import { Certificate } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { CertificateSheet } from './sheets/certificate-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

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

export const CertificateForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const certificates = resume.certificates

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {certificates.length === 0 && (
        <p className="text-center">No certificate added</p>
      )}
      <CertificateDragList
        items={certificates}
        getItemData={getCertificateData}
        isItemData={isCertificateData}
        setItems={setResumeField.bind(null, 'certificates')}
        EditSheet={CertificateSheet}
        itemType="Certificate Experience"
        onDelete={id => {
          setResumeField(
            'certificates',
            certificates.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
