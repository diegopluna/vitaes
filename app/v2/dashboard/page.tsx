import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/v2/signin");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
    </div>
  );
};

export default Dashboard;
