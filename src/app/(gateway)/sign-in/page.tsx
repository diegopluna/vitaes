import { LoginForm } from './_components/login-form'

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-9.5rem)] w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
