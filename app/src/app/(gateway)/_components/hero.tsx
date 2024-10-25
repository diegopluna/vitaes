import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-5xl p-6 sm:p-8 flex flex-col items-center text-center">
        <Image src="/vitaes.svg" alt="Vitaes" width={72} height={72} />
        <h1 className="text-3xl font-bold sm:text-4xl">Vitaes</h1>
      </div>
      <h1 className="!mb-0"></h1>
    </section>
  )
}
