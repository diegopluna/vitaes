import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
