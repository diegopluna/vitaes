import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

const MailSentPage = async () => {
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
              <h1 className="text-3xl font-bold">Check your email!</h1>
              <Image
                src="/mail-sent.svg"
                alt="Image"
                width="400"
                height="400"
                className="h-full w-full px-6"
              />
              <p className="text-balance text-muted-foreground">
                A sign in link has been sent to your email address.
              </p>
            </div>
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

export default MailSentPage;
