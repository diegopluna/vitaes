import { auth } from "@/auth";
import Dashboard from "@/components/dashboard";
import db from "@/db/drizzle";
import { resumes } from "@/db/schema";
import { userCV } from "@/types/users-types";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const user = session?.user;
  const savedCVs: userCV[] = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, user.id!));
  return <Dashboard savedCVs={savedCVs} userId={user.id!} />;
}
