export function uniqueSlug(email: string, name: string) {
  const user = email.split('@')[0]
  const rawPartialSlug = `${user}-${name}`.toLowerCase()
  const cleanPartialSlug = rawPartialSlug
    .replaceAll(/[^a-z0-9\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .trim()
  return `${cleanPartialSlug}-${Date.now()}`
}
