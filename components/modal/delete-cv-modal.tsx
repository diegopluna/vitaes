"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash, Loader2 } from "lucide-react";
import { deleteCV } from "@/server/actions";
import { toast } from "sonner";

export default function DeleteCVModal({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDeleteCV = async (id: string) => {
    setLoading(true);
    await deleteCV(id);
    toast.success("CV deleted successfully");
    setLoading(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className="h-8 w-8 rounded-full border"
          size={"icon"}
          variant={"outline"}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete CV</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this CV?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <Button size={"sm"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {loading ? (
            <Button size={"sm"} variant={"destructive"} disabled={loading}>
              <Loader2 className="h-5 w-5 mx-1 animate-spin" /> Deleting...
            </Button>
          ) : (
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={() => handleDeleteCV(id)}
              disabled={loading}
            >
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
