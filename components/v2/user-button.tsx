"use client";

import { User } from "next-auth";
import { LucideUser2 } from "lucide-react";
import { GeistSans } from "geist/font/sans";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleSignOut } from "@/server/actions";
import { Separator } from "../ui/separator";
import { UserSettingsModal } from "./user-settings-modal";
import { useModalStore } from "@/store/use-modal-store";

interface UserButtonProps {
  user: User;
}

export const UserButton = ({ user }: UserButtonProps) => {
  const { setOpen } = useModalStore();

  return (
    <div className={`${GeistSans.className} w-10 h-10`}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={user.image as string}
              alt={user.name ? user.name : "User"}
            />
            <AvatarFallback>
              {user.name ? user.name[0] : <LucideUser2 className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {user.name ? user.name : "User"}
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            User Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSignOut()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
