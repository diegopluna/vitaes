"use server"

import { signIn, signOut } from "@/auth"
import db from "@/db/drizzle"
import { resumes } from "@/db/schema"
import { CVProps } from "@/types/cv-types"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export const signInWithGithub = async () => {
    await signIn("github")
    redirect("/dashboard")
}

export const handleSignOut = async () => {
    await signOut()
}

export const uploadCV = async (name: string, data: CVProps, userId: string) => {
    await db.insert(resumes).values({
        name: name,
        data: data,
        userId: userId,
        updatedAt: new Date(),
    })
    redirect("/dashboard")
}

export const deleteCV = async (id: string) => {
    await db.delete(resumes).where(eq(resumes.id, id))
    redirect("/dashboard")
}

export const updateCV = async (id: string, name: string, data: CVProps) => {
    await db.update(resumes).set({
        name: name,
        data: data,
        updatedAt: new Date(),
    }).where(eq(resumes.id, id))
    redirect("/dashboard")
}