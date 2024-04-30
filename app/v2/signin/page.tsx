import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "./_components/user-auth-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/v2/dashboard");
  }

  return (
    <div className="min-h-screen">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
        <div className="hidden  lg:block">
          <Image
            src="/hiring.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full px-6"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
