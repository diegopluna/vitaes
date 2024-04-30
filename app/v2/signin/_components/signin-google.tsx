import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/server/actions";

export default function GoogleSignin() {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit" variant="outline" className="w-full">
        <div className="flex items-center justify-center">
          Login with Google
        </div>
      </Button>
    </form>
  );
}
