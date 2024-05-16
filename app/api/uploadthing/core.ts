import { auth } from "@/auth";
import { randomUUID } from "crypto";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTFiles, UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const vitaesFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req, files }) => {
      const session = await auth();
      const user = session?.user;

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);

      return { url: file.url };
    }),
} satisfies FileRouter;

export type vitaesFileRouter = typeof vitaesFileRouter;
