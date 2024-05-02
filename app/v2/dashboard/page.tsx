import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { UserSettingsModal } from "@/components/v2/user-settings-modal";

const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/v2/signin");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <UserSettingsModal user={session.user} />
    </div>
  );
};

export default Dashboard;
