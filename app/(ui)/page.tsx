import { CVContextProvider } from "@/components/cv/use-cv";
import dynamic from 'next/dynamic'
 
const CVForm = dynamic(() => import('@/components/cv/cv-form'), { ssr: false })

export default function Home() {
  return (
      <CVContextProvider>
        <CVForm />
      </CVContextProvider>
    
  );
}
