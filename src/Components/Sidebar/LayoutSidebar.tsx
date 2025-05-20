import { SidebarProvider, SidebarTrigger } from "../../UI/Shadcn/ShadcnSidebar";
import { AppSidebar } from "./AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
