"use client"

import { Button } from "./ui/button"
import type { Session }  from "@auth/core/types"

export default function UserButton({session} : {session: Session | null}) {
    if (!session) {
        return (
            <Button onClick={ async () => {
                await fetch('/api/auth/providers/github')
            }} size="sm">
                Sign in with GitHub
            </Button>
        )
    } else {
        return (
            <Button size="sm">
                {session.user?.name}
            </Button>
        )
    }
}