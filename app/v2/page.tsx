import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Hero } from "./_components/hero";
import { Features } from "./_components/features";

const Page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/v2/dashboard");
  }

  return (
    <>
      <Hero />
      <Features />
    </>
  );
};

export default Page;
