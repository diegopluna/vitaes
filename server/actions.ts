"use server";

import { signIn, signOut } from "@/auth";
import db from "@/db/drizzle";
import { resumes, users } from "@/db/schema";
import { CVProps } from "@/types/cv-types";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const signInWithGithub = async () => {
  await signIn("github");
  redirect("/dashboard");
};

export const signInWithGoogle = async () => {
  await signIn("google");
  redirect("/v2/dashboard");
};

export const signInWithEmail = async (email: string) => {
  console.log("formData", email);
  const formData = new FormData();
  formData.append("email", email);
  await signIn("resend", formData);
};

export const handleSignOut = async () => {
  await signOut();
};

export const uploadCV = async (name: string, data: CVProps, userId: string) => {
  await db.insert(resumes).values({
    name: name,
    data: data,
    userId: userId,
    updatedAt: new Date(),
  });
  redirect("/dashboard");
};

export const deleteCV = async (id: string) => {
  await db.delete(resumes).where(eq(resumes.id, id));
  redirect("/dashboard");
};

export const updateCV = async (id: string, name: string, data: CVProps) => {
  await db
    .update(resumes)
    .set({
      name: name,
      data: data,
      updatedAt: new Date(),
    })
    .where(eq(resumes.id, id));
  redirect("/dashboard");
};

export const getUser = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));
  return user[0];
};
