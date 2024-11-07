import { SignupForm } from './_components/signup-form'

export default function Page() {
  return (
    <div className="flex h-min-[calc(100vh-10rem)] md:h-min-[calc(100vh-9.5rem)] w-full items-center justify-center p-4">
      <SignupForm />
    </div>
  )
}
