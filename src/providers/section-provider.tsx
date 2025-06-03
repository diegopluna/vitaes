import { CertificateForm } from '@/components/builder/resume/form/certificate-form'
import { ComitteeForm } from '@/components/builder/resume/form/comittee-form'
import { EducationForm } from '@/components/builder/resume/form/education-form'
import { ExtracurricularForm } from '@/components/builder/resume/form/extracurricular-form'
import { HonorsForm } from '@/components/builder/resume/form/honors-form'
import { LanguageForm } from '@/components/builder/resume/form/language-form'
import { PersonalForm } from '@/components/builder/resume/form/personal-form'
import { PresentationsForm } from '@/components/builder/resume/form/presentations-form'
import { ProfileForm } from '@/components/builder/resume/form/profile-form'
import { ProjectForm } from '@/components/builder/resume/form/project-form'
import { SummaryForm } from '@/components/builder/resume/form/summary-form'
import { WorkForm } from '@/components/builder/resume/form/work-form'
import { WritingsForm } from '@/components/builder/resume/form/writings-form'
import { CertificateSheet } from '@/components/builder/resume/sheet/certificate-sheet'
import { ComitteeSheet } from '@/components/builder/resume/sheet/comitte-sheet'
import { EducationSheet } from '@/components/builder/resume/sheet/education-sheet'
import { ExtracurricularSheet } from '@/components/builder/resume/sheet/extracurricular-sheet'
import { HonorSheet } from '@/components/builder/resume/sheet/honor-sheet'
import { LanguageSheet } from '@/components/builder/resume/sheet/language-sheet'
import { PresentationSheet } from '@/components/builder/resume/sheet/presentation-sheet'
import { ProfileSheet } from '@/components/builder/resume/sheet/profile-sheet'
import { ProjectSheet } from '@/components/builder/resume/sheet/project-sheet'
import { WorkSheet } from '@/components/builder/resume/sheet/work-sheet'
import { WritingSheet } from '@/components/builder/resume/sheet/writing-sheet'
import { m } from '@/paraglide/messages'
import {
	IconAt,
	IconBriefcase,
	IconFileCheck,
	IconLanguage,
	IconMedal,
	IconNotes,
	IconPencil,
	IconPresentation,
	IconUser,
	IconUsersGroup,
} from '@tabler/icons-react'
import { GraduationCap, NotebookPen, PencilRuler } from 'lucide-react'
import { type JSX, createContext, use, useRef } from 'react'
import { useResumeStore } from './resume-store-provider'

export type Section = {
	id: string
	title: string
	icon: React.ExoticComponent
	form: JSX.Element
	sheet?: JSX.Element
}

type SectionsContextProps = {
	sections: Section[]
	sectionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>
	setSectionRef: (id: string, ref: HTMLDivElement | null) => void
}

const SectionsContext = createContext<SectionsContextProps | undefined>(
	undefined,
)

type SectionsProviderProps = {
	children: React.ReactNode
}

export const SectionsProvider = ({ children }: SectionsProviderProps) => {
	const { resume } = useResumeStore((s) => s)
	const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

	const setSectionRef = (id: string, ref: HTMLDivElement | null) => {
		sectionRefs.current[id] = ref
	}

	const sections: Section[] = [
		{
			id: 'personal',
			title: m['sections.personal'](),
			icon: IconUser,
			form: <PersonalForm />,
		},
		{
			id: 'summary',
			title: resume.basics.summary.label,
			icon: IconNotes,
			form: <SummaryForm />,
		},
		{
			id: 'profiles',
			title: m['sections.profiles'](),
			icon: IconAt,
			form: <ProfileForm />,
			sheet: <ProfileSheet />,
		},
		{
			id: 'work',
			title: resume.work.label,
			icon: IconBriefcase,
			form: <WorkForm />,
			sheet: <WorkSheet />,
		},
		{
			id: 'honors',
			title: resume.honors.label,
			icon: IconMedal,
			form: <HonorsForm />,
			sheet: <HonorSheet />,
		},
		{
			id: 'presentation',
			title: resume.presentations.label,
			icon: IconPresentation,
			form: <PresentationsForm />,
			sheet: <PresentationSheet />,
		},
		{
			id: 'writing',
			title: resume.writings.label,
			icon: IconPencil,
			form: <WritingsForm />,
			sheet: <WritingSheet />,
		},
		{
			id: 'comittees',
			title: resume.committees.label,
			icon: IconUsersGroup,
			form: <ComitteeForm />,
			sheet: <ComitteeSheet />,
		},
		{
			id: 'education',
			title: resume.education.label,
			icon: GraduationCap,
			form: <EducationForm />,
			sheet: <EducationSheet />,
		},
		{
			id: 'extracurriculars',
			title: resume.extracurriculars.label,
			icon: NotebookPen,
			form: <ExtracurricularForm />,
			sheet: <ExtracurricularSheet />,
		},
		{
			id: 'projects',
			title: resume.projects.label,
			icon: PencilRuler,
			form: <ProjectForm />,
			sheet: <ProjectSheet />,
		},
		{
			id: 'languages',
			title: resume.languages.label,
			icon: IconLanguage,
			form: <LanguageForm />,
			sheet: <LanguageSheet />,
		},
		{
			id: 'certificates',
			title: resume.certificates.label,
			icon: IconFileCheck,
			form: <CertificateForm />,
			sheet: <CertificateSheet />,
		},
	]

	return (
		<SectionsContext value={{ sections, sectionRefs, setSectionRef }}>
			{children}
		</SectionsContext>
	)
}

export const useSections = () => {
	const context = use(SectionsContext)

	if (!context) {
		throw new Error('useSections must be used within a SectionsProvider')
	}

	return context
}
