import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { validatePrefix } from 'intlayer'

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale

    const { isValid, localePrefix } = validatePrefix(localeParam)

    if (!isValid) {
      throw redirect({
        to: `/{-$locale}/404`,
        params: { locale: localePrefix },
      })
    }
  },
  component: Outlet,
})
