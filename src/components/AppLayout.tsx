import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <main className="md:ml-64 min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
