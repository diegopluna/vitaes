'use client'

import { Certificate } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { CertificatesSheet } from './sheets/certificates-sheet'

const certificatesKey = Symbol('certificates')

function getCertificatesData(certificates: Certificate): ItemData<Certificate> {
  return {
    [certificatesKey]: true,
    itemId: certificates.id,
  }
}

function isCertificatesData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Certificate> {
  return data[certificatesKey] === true
}

const CertificatesDragList = DragList<Certificate>

export const CertificatesForm = () => {
  const { resume, setCertificates } = useResume()

  const certificates = resume.certificates

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {certificates.length === 0 && (
        <p className="text-center">No certificates added</p>
      )}
      <CertificatesDragList
        items={certificates}
        getItemData={getCertificatesData}
        isItemData={isCertificatesData}
        setItems={setCertificates}
        EditSheet={CertificatesSheet}
        itemType="Certificates"
        onDelete={(id) => {
          setCertificates(certificates.filter((c) => c.id !== id))
        }}
      />
    </div>
  )
}
