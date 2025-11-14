import { Link } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'
import { UserButton } from '@daveyplate/better-auth-ui'
import { useResumeStore } from '@/context/use-resume-store'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

export default function BuilderHeader({
  documentUrl,
}: {
  documentUrl: string
}) {
  const { lastSaved, isSaving } = useResumeStore()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ] as const

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} to={to}>
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <span>{isSaving ? 'Saving...' : lastSaved.toLocaleString()}</span>
          <Button variant="outline" asChild>
            <a href={documentUrl} download="resume.pdf">
              <Download className="size-4" />
              Download
            </a>
          </Button>
          <ModeToggle />
          <UserButton className="bg-transparent" />
        </div>
      </div>
      <hr />
    </div>
  )
}
