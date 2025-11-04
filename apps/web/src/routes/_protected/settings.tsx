import { m } from '@/paraglide/messages'
import {
  DeleteAccountCard,
  ProvidersCard,
  SessionsCard,
  UpdateNameCard,
} from '@daveyplate/better-auth-ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
      <UpdateNameCard
        localization={{
          NAME: m['settings.name.label'](),
          NAME_DESCRIPTION: m['settings.name.description'](),
          NAME_PLACEHOLDER: m['settings.name.placeholder'](),
          NAME_INSTRUCTIONS: m['settings.name.instructions'](),
          SAVE: m['settings.name.saveChanges'](),
        }}
      />
      <ProvidersCard
        localization={{
          PROVIDERS: m['settings.providers.label'](),
          PROVIDERS_DESCRIPTION: m['settings.providers.description'](),
          LINK: m['settings.providers.link'](),
          UNLINK: m['settings.providers.unlink'](),
        }}
      />
      <SessionsCard
        localization={{
          SESSIONS: m['settings.sessions.label'](),
          SESSIONS_DESCRIPTION: m['settings.sessions.description'](),
          CURRENT_SESSION: m['settings.sessions.currentSession'](),
          SIGN_OUT: m['settings.sessions.signOut'](),
          REVOKE: m['settings.sessions.revoke'](),
        }}
      />
      <DeleteAccountCard
        localization={{
          DELETE_ACCOUNT: m['settings.deleteAccount.label'](),
          DELETE_ACCOUNT_DESCRIPTION: m['settings.deleteAccount.description'](),
          DELETE: m['settings.deleteAccount.button'](),
          DELETE_ACCOUNT_INSTRUCTIONS:
            m['settings.deleteAccount.instructions'](),
          CANCEL: m['settings.deleteAccount.cancel'](),
        }}
      />
    </div>
  )
}
