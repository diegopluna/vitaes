export function uniqueSlug(email: string, name: string) {
  const user = email.split('@')[0]
  const rawPartialSlug = `${user}-${name}`.toLowerCase()
  const cleanPartialSlug = rawPartialSlug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `${cleanPartialSlug}-${Date.now()}`
}
