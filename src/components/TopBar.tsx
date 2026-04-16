import { Search, Bell, HelpCircle, Menu } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex justify-between items-center w-full px-12 py-5 sticky top-0 bg-surface/80 backdrop-blur-md z-50 transition-all border-b border-outline-variant/5">
      <div className="flex items-center gap-6">
        <div className="md:hidden">
          <Menu className="text-primary cursor-pointer w-6 h-6" />
        </div>
        <div className="relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 w-5 h-5" />
          <input 
            className="bg-surface-container border-none rounded-full py-2.5 pl-12 pr-6 text-sm w-80 focus:ring-1 focus:ring-primary/20 placeholder:text-outline/60 transition-all" 
            placeholder="Search patients, invoices..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-full hover:bg-surface-container-high text-primary transition-all group">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-surface-container-high text-primary transition-all group">
          <HelpCircle className="w-6 h-6" />
        </button>
        <div className="h-10 w-10 rounded-full bg-primary-container overflow-hidden ml-2 ring-2 ring-primary/10 hover:ring-primary/30 transition-all cursor-pointer">
          <img 
            alt="Clinician profile" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=200&h=200" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
