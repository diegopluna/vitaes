export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
        <p className="text-xl mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </div>
  )
}
