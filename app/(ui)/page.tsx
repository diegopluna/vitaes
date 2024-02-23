import CVForm from "@/components/cv/cv-form";
import { CVContextProvider } from "@/components/cv/use-cv"; // Import CVContextProvider from the appropriate module

export default function Home() {
  return (
    <CVContextProvider>
      <CVForm />
    </CVContextProvider>
  );
}
