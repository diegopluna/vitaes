"use client"

import { signOut } from "@/auth"
import { Button } from "./ui/button"
import type { Session }  from "@auth/core/types"

export default function UserButton({session} : {session: Session | null}) {
    if (!session) {
        return (
            <Button size="sm">
                Sign in with GitHub
            </Button>
        )
    } else {
        return (
            <Button onClick={async () => {
                await signOut({redirectTo: "/"})
            } } size="sm">
                {session.user?.name}
            </Button>
        )
    }
}