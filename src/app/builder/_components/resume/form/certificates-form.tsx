'use client'

import { Certificate } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { CertificateSheet } from './sheets/certificates-sheet'

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

export const CertificatesForm = () => {
  const { resume, setCertificates } = useResumeStore((state) => state)

  const certificates = resume.certificates

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {certificates.length === 0 && (
        <p className="text-center">No certificates added</p>
      )}
      <CertificateDragList
        items={certificates}
        getItemData={getCertificateData}
        isItemData={isCertificateData}
        setItems={setCertificates}
        itemType="certificate"
        onDelete={(id) => {
          setCertificates(certificates.filter((c) => c.id !== id))
        }}
        EditModal={CertificateSheet}
      />
    </div>
  )
}
