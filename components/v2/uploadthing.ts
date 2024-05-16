import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { vitaesFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<vitaesFileRouter>();
export const UploadDropzone = generateUploadDropzone<vitaesFileRouter>();
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<vitaesFileRouter>();
