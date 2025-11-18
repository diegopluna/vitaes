import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Palette,
  Share2,
  Download,
  Sparkles,
  Check,
  ArrowRight,
  Github,
} from 'lucide-react'
import { m } from '@/paraglide/messages'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSelector } from '@/components/language-selector'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const features = [
    {
      icon: FileText,
      title: m['landing.features.preview.title'](),
      description: m['landing.features.preview.description'](),
    },
    {
      icon: Palette,
      title: m['landing.features.themes.title'](),
      description: m['landing.features.themes.description'](),
    },
    {
      icon: Share2,
      title: m['landing.features.sharing.title'](),
      description: m['landing.features.sharing.description'](),
    },
    {
      icon: Download,
      title: m['landing.features.download.title'](),
      description: m['landing.features.download.description'](),
    },
    {
      icon: Sparkles,
      title: m['landing.features.free.title'](),
      description: m['landing.features.free.description'](),
    },
  ]

  const benefits = [
    m['landing.benefits.noDesign'](),
    m['landing.benefits.professional'](),
    m['landing.benefits.instant'](),
    m['landing.benefits.share'](),
  ]

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-2 transition-all hover:opacity-80"
          >
            <div className="relative">
              <img src="/logo.svg" alt="Vitaes" className="h-6 w-6" />
              <div className="absolute inset-0 -z-10 bg-primary/20 blur-md transition-all group-hover:bg-primary/30" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Vitaes</span>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageSelector />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/login">{m['landing.hero.signIn']()}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-28 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              <span>{m['landing.hero.badge']()}</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                <span className="bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                  {m['landing.hero.title']()}
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
                {m['landing.hero.subtitle']()}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className="text-lg shadow-lg shadow-primary/30 transition hover:shadow-primary/40"
              >
                <Link to="/login">
                  {m['landing.hero.cta']()}
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
            <div className="border border-primary/10 bg-card/60 p-6 text-left text-sm text-muted-foreground backdrop-blur">
              {m['landing.hero.freeCopy']()}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-blue-500/20 blur-3xl" />
            <div className="relative border border-white/10 bg-card/80 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {m['landing.preview.label']()}
                  </p>
                  <p className="text-lg font-semibold">
                    {m['landing.preview.resumeBuilder']()}
                  </p>
                </div>
                <div className="bg-primary/10 px-3 py-1 text-sm text-primary">
                  {m['landing.preview.liveSync']()}
                </div>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 border border-white/5 bg-background/40 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center bg-primary/10">
                    <FileText className="size-4 text-primary" />
                  </div>
                  {m['landing.preview.items.dragDrop']()}
                </li>
                <li className="flex items-center gap-2 border border-white/5 bg-background/40 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center bg-primary/10">
                    <Palette className="size-4 text-primary" />
                  </div>
                  {m['landing.preview.items.themes']()}
                </li>
                <li className="flex items-center gap-2 border border-white/5 bg-background/40 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center bg-primary/10">
                    <Share2 className="size-4 text-primary" />
                  </div>
                  {m['landing.preview.items.share']()}
                </li>
              </ul>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {m['landing.preview.caption']()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Visual Preview/Demo Section - Add resume builder screenshot or interactive demo */}

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            {m['landing.features.title']()}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-muted-foreground">
            {m['landing.features.subtitle']()}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-white/10 bg-card/70 backdrop-blur transition-all hover:border-primary/50 hover:shadow-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/0 via-primary/5 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardContent className="relative p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* TODO: Visual Preview/Demo Section - Add resume builder screenshot or interactive demo */}

      {/* Benefits Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl border border-white/10 bg-card/70 p-10 shadow-2xl backdrop-blur">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            {m['landing.benefits.title']()}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border border-white/5 bg-background/60 p-4 shadow-lg shadow-black/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary">
                    <Check className="size-5 text-primary-foreground" />
                  </div>
                  <p className="text-lg font-medium">{benefit}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className=" flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Vitaes" className="h-5 w-5" />
            <span className="font-semibold">Vitaes</span>
          </div>
          <a
            href="https://github.com/diegopluna/vitaes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="size-4" />
            <span>{m['landing.footer.github']()}</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
