import { auth } from "@/auth";
import { Landing } from "@/components/landing";
import { redirect } from "next/navigation";

export default async function LandingPage() {
    const session = await auth()
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <Landing />
    )
}