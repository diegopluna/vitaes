import { auth } from "@/auth";
import { CVContextProvider } from "@/components/cv/use-cv";
import db from "@/db/drizzle";
import { resumes } from "@/db/schema";
import { eq } from "drizzle-orm";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const CVForm = dynamic(() => import("@/components/cv/cv-form"), { ssr: false });

export default async function Page({ params }: { params: { id: string[] } }) {
  const session = await auth();
  let cv = undefined;
  let name = undefined;
  let id = undefined;
  if (params.id !== undefined && params.id.length > 1) {
    redirect("/builder");
  }
  if (params.id !== undefined && session?.user) {
    id = params.id[0];
    try {
      const foundCV = await db.select().from(resumes).where(eq(resumes.id, id));
      if (foundCV.length === 0 || foundCV[0].userId !== session.user.id) {
        throw new Error("CV not found");
      }
      cv = foundCV[0].data;
      name = foundCV[0].name;
    } catch (e) {
      redirect("/builder");
    }
  }

  return (
    <CVContextProvider>
      <CVForm cvData={cv} name={name} session={session} id={id} />
    </CVContextProvider>
  );
}
