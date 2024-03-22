"use client"
import GithubSigninButton from "../github-signin-button"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import UserButton from "./user-button"

export default function NavbarButton({session} : {session: Session | null}) {
    if (!session) {
        return (
            <GithubSigninButton />
        )
    } else {
        return (
            <UserButton session={session} />
        )
    }
}