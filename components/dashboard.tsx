import React from "react";
import { Button } from "./ui/button";
import { ScrollText, Pencil, Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { userCV } from "@/types/users-types";
import UploadCV from "./modal/upload-cv-modal";
import DeleteCVModal from "./modal/delete-cv-modal";
import DownloadCVModal from "./modal/download-cv-modal";
import Link from "next/link";

export default function Dashboard({
  savedCVs,
  userId,
}: {
  savedCVs: userCV[];
  userId: string;
}) {
  return (
    <div
      key={1}
      className="flex min-h-screen items-start p-4 gap-4 flex-col md:flex-row"
    >
      <div className="grid gap-4 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <ScrollText className="h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tighter">
            Manage CVs
          </h1>
          <Button size={"sm"}>
            <Link href="/builder">Create CV</Link>
          </Button>
          <UploadCV userId={userId} />
        </div>
        {savedCVs.map((cv) => (
          <Card key={cv.id}>
            <CardContent className="flex items-start gap-4 p-4 md:p-6">
              <div className="grid gap-1 text-sm">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-base">{cv.name}</h2>
                  <div className="flex gap-2">
                    <DeleteCVModal id={cv.id} />
                    <Button
                      className="h-8 w-8 rounded-full border"
                      size={"icon"}
                      variant={"outline"}
                    >
                      <Link href={`/builder/${cv.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <DownloadCVModal cv={cv.data} name={cv.name} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Template:{" "}
                  {cv.data.settings.model.charAt(0).toUpperCase() +
                    cv.data.settings.model.slice(1)}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Created at: {cv.createdAt.getDate()}-{cv.createdAt.getMonth()}
                  -{cv.createdAt.getFullYear()} | Updated at:{" "}
                  {cv.updatedAt.getDate()}-{cv.updatedAt.getMonth()}-
                  {cv.updatedAt.getFullYear()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {savedCVs.length === 0 && (
          <div className="flex items-center justify-center h-48">
            <p className="text-gray-500 dark:text-gray-400">No CVs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
