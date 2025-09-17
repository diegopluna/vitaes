export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full justify-center items-center h-screen">
      <div className="w-[22rem]">
        <div className="flex flex-col items-center justify-center gap-4">
          {children}
        </div>
      </div>
    </div>
  )
}
