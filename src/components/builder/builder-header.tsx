import { updateResumeName } from '@/api/resume'
import { useAutoSaveResume } from '@/hooks/use-auto-save-resume'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { useResumeMeta } from '@/providers/resume-meta-provider'
import { useResumeStore } from '@/providers/resume-store-provider'
import { IconDownload, IconPencil } from '@tabler/icons-react'
import { formatDistanceToNow } from 'date-fns'
import { de, enUS, es, fr, ja, pt, zhCN } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'

export function BuilderHeader() {
	const resume = useResumeStore((s) => s.resume)
	const { id, name, updatedAt, setName } = useResumeMeta()

	const {
		isPending,
		isError: autoSaveError,
		error: autoSaveErrorDetails,
		lastSaved,
	} = useAutoSaveResume(resume, id, name)

	const [editingName, setEditingName] = useState(false)
	const [nameValue, setNameValue] = useState(name)

	useEffect(() => {
		setNameValue(name)
	}, [name])

	const handleNameClick = () => {
		setEditingName(true)
	}

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value)
	}

	// TODO: Add optimistic update
	const saveName = (newName: string) => {
		if (!newName.trim() || newName === name) return
		updateResumeName({ data: { id, name: newName.trim() } })
			.then((updatedResume) => {
				setName(updatedResume.name)
			})
			.catch(() => {
				toast.error('Failed to update resume name')
			})
	}

	const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setEditingName(false)
			saveName(nameValue)
		}
	}

	const handleNameBlur = () => {
		setEditingName(false)
		saveName(nameValue)
	}

	return (
		<header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
			<div className="flex items-center gap-2 px-4 flex-1">
				<SidebarTrigger />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							{m['builder-header.builder']()}
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<div className="relative group inline-block">
								{editingName ? (
									<Input
										className="text-base font-medium bg-background border-b border-primary focus:outline-none px-1"
										value={nameValue}
										autoFocus
										onChange={handleNameChange}
										onBlur={handleNameBlur}
										onKeyDown={handleNameKeyDown}
									/>
								) : (
									<span
										className="cursor-pointer group-hover:border group-hover:border-primary group-hover:rounded group-hover:px-2 group-hover:py-1 transition-all"
										onClick={handleNameClick}
									>
										{name}
										<span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<IconPencil className="size-4 text-primary" />
										</span>
									</span>
								)}
							</div>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			{/* TODO: Add Download Button, Maybe a button to share the resume and print button */}
			<DownloadPdfButton id={id} />
			{isPending && (
				<div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
					{m['builder-header.saving']()}
				</div>
			)}
			{autoSaveError && (
				<div className="text-xs text-destructive px-4 whitespace-nowrap">
					{m['builder-header.error-saving']({
						error: autoSaveErrorDetails?.message || 'Unknown error',
					})}
				</div>
			)}
			{lastSaved ? (
				<div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
					{m['builder-header.last-saved']({
						time: relativeTime({ date: lastSaved }),
					})}
				</div>
			) : (
				updatedAt && (
					<div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
						{m['builder-header.last-saved']({
							time: relativeTime({ date: updatedAt }),
						})}
					</div>
				)
			)}
		</header>
	)
}

function DownloadPdfButton({ id }: { id: string }) {
	const [loading, setLoading] = useState(false)

	const handleDownload = async () => {
		setLoading(true)
		try {
			const res = await fetch('/api/pdf', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			})
			if (!res.ok) throw new Error('Failed to generate PDF')
			const blob = await res.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'vitaes.pdf'
			document.body.appendChild(a)
			a.click()
			a.remove()
			window.URL.revokeObjectURL(url)
		} catch {
			// Optionally show error toast
			toast.error(m['builder-header.failed-to-generate-pdf']())
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			size="sm"
			variant="outline"
			onClick={handleDownload}
			disabled={loading}
			className="mr-2"
			aria-label="Download PDF"
		>
			<IconDownload className="w-4 h-4" />
			<span className="hidden sm:inline">
				{loading
					? m['builder-header.downloading']()
					: m['builder-header.download']()}
			</span>
		</Button>
	)
}

function relativeTime({ date }: { date: string | number | Date }) {
	const [relative, setRelative] = useState('')

	useEffect(() => {
		function updateRelative() {
			const currentLocale = getLocale()

			// Map paraglide locales to date-fns locales
			const localeMap = {
				en: enUS,
				de: de,
				es: es,
				fr: fr,
				ja: ja,
				pt: pt,
				zh: zhCN,
			} as const

			const dateFnsLocale = localeMap[currentLocale] || enUS

			setRelative(
				formatDistanceToNow(new Date(date), {
					addSuffix: true,
					locale: dateFnsLocale,
				}),
			)
		}
		updateRelative()
		const interval = setInterval(updateRelative, 60_000)
		return () => clearInterval(interval)
	}, [date])

	return relative
}
