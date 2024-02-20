import CVForm from "@/components/cv/cv-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CVForm />
    </main>
  );
}
