import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const UserSettingsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1>User Profile</h1>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <h1>Teste</h1>
      </DialogContent>
    </Dialog>
  );
};
