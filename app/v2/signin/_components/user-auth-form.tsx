"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { FormEvent, FormEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Github, Loader2Icon } from "lucide-react";
import { signInWithEmail } from "@/server/actions";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const handleFormSubmit = async () => {
    // const formData = new FormData(e.currentTarget);

    setIsLoading(true);
    await signInWithEmail(email);
    setIsLoading(false);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              autoCapitalize="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <Button type="button" onClick={handleFormSubmit} disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
};
