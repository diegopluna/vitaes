"use server"

import { signIn, signOut } from "@/auth"

export const signInWithGithub = async () => {
    await signIn("github")
}

export const handleSignOut = async () => {
    await signOut()
}