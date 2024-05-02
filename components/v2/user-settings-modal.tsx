"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/use-modal-store";
import { Input } from "../ui/input";
import { User } from "next-auth";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";

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
        <div className="flex flex-co gap-x-2">
          <Avatar>
            <AvatarImage src={image} alt={name ? name : "User name"} />
            <AvatarFallback>{name ? name[0] : ""}</AvatarFallback>
          </Avatar>
          <div className="flex flex-row">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="url"
              placeholder="https://example.com/picture.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <Input placeholder="John Doe" value={name} />
      </DialogContent>
    </Dialog>
  );
};
