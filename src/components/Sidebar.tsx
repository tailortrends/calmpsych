import { NavLink } from "react-router-dom";
import { 
  Calendar, 
  FolderHeart, 
  MessageSquare, 
  Banknote, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut,
  Share2,
  FileText
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { icon: Calendar, label: "Today's Schedule", href: "/" },
  { icon: FolderHeart, label: "Patient Records", href: "/patients" },
  { icon: FileText, label: "Note Templates", href: "/note-templates" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Banknote, label: "Billing", href: "/billing" },
  { icon: Share2, label: "Integrations", href: "/integrations" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low py-8 z-40 border-r border-outline-variant/10">
      <div className="px-8 mb-12">
        <h1 className="font-serif text-2xl italic text-primary">Calm Psych</h1>
        <p className="font-sans font-medium text-[10px] text-on-surface/40 uppercase tracking-[0.2em] mt-1">Clinician Portal</p>
      </div>

      <nav className="flex-grow flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center px-8 py-3.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all font-medium text-sm group relative",
              isActive && "bg-surface-container-highest text-primary font-bold"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("mr-4 w-5 h-5 transition-all", isActive && "fill-primary/10")} />
                {item.label}
                {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-8 mb-10">
        <NavLink to="/session-note" className="w-full py-4 px-4 bg-primary text-white rounded-xl font-semibold text-sm transition-all hover:bg-primary-dim active:scale-95 shadow-lg shadow-primary/10 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Start Session
        </NavLink>
      </div>

      <div className="mt-auto flex flex-col space-y-1 border-t border-outline-variant/10 pt-6">
        <a className="flex items-center px-8 py-3 text-on-surface-variant hover:text-primary transition-colors font-medium text-sm group" href="#">
          <HelpCircle className="mr-4 w-5 h-5" />
          Help Center
        </a>
        <a className="flex items-center px-8 py-3 text-on-surface-variant hover:text-error transition-colors font-medium text-sm group" href="#">
          <LogOut className="mr-4 w-5 h-5 text-error/70" />
          Sign Out
        </a>
      </div>
    </aside>
  );
}
