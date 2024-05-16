"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/use-modal-store";
import { Input } from "../ui/input";
import { User } from "next-auth";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { UploadButton } from "./uploadthing";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface UserSettingsModalProps {
  user: User;
}

export const UserSettingsModal = ({ user }: UserSettingsModalProps) => {
  const { isOpen, setOpen } = useModalStore();
  const [name, setName] = useState(user.name ? user.name : "");
  const [image, setImage] = useState(user.image ? user.image : "");

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center">
          <div className="relative h-14 w-14 rounded-full overflow-hidden">
            <Avatar className="relative h-14 w-14 rounded-full overflow-hidden">
              <AvatarImage src={image} alt={name ? name : "User name"} />
              <AvatarFallback>{name ? name[0] : ""}</AvatarFallback>
            </Avatar>
            <UploadButton
              className="absolute inset-0 bg-gray-900/50 opacity-0 transition-opacity duration-300 ut-uploading:opacity-100 hover:opacity-100 hover:cursor-pointer flex justify-center items-center"
              content={{
                button: (
                  <>
                    <Upload className="absolute w-6 h-6 text-white flex ut-uploading:hidden ut-uploading:opacity-0" />
                    <Loader2 className="absolute w-6 h-6 text-white hidden ut-uploading:flex  ut-uploading:animate-spin" />
                  </>
                ),
              }}
              appearance={{
                button: "bg-black/0 w-full h-full rouned-full",
                allowedContent: "hidden",
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res[0].url);
                toast.success("File uploaded successfully");
              }}
              onUploadError={(error: Error) => {
                toast.error("Error uploading file: " + error.cause);
              }}
              onBeforeUploadBegin={(files: File[]) => {
                const fileOverrides = files.map((file, index) => {
                  const extension = file.name.split(".").pop();
                  const newName = `${user.id! + index}.${extension}`;
                  return new File([file], newName, {
                    type: file.type,
                  });
                });
                return fileOverrides;
              }}
            />
          </div>
          <div className="flex flex-col w-full ">
            <Label htmlFor="picture" className="my-2">
              Picture
            </Label>
            <Input
              id="picture"
              type="url"
              placeholder="https://example.com/picture.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Label htmlFor="name" className="my-2">
            Full Name
          </Label>

          <Input placeholder="John Doe" value={name} />
        </div>
        <div className="flex flex-col w-full"></div>
        <DialogFooter>
          <Button variant="default" onClick={() => setOpen(false)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
