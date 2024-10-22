import { Outlet } from "@tanstack/react-router";
import { AppHeader } from "./app-header/app-header";
import { AppSidebar } from "./app-sidebar/app-sidebar";

export const BuilderLayout = () => {
  return (
    <AppSidebar>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </AppSidebar>
  );
};
