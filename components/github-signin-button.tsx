import { Button } from "@/components/ui/button";
import { signInWithGithub } from "@/server/actions";
import { Github } from "lucide-react";

export default function GithubSigninButton() {
  return (
    <form action={signInWithGithub}>
        <Button  type="submit">
        <div className="flex items-center justify-center">
            <Github className="w-4 h-4 mr-2" />
            Sign in with Github
        </div>
        </Button>
    </form>
    
  );
}
