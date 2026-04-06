"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import { 
  Trophy, 
  LayoutDashboard, 
  Swords, 
  Wallet, 
  Settings, 
  LogOut, 
  Menu,
  Bell,
  X,
  Users,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardLayout({ children, isAdmin = false }: { children: React.ReactNode, isAdmin?: boolean }) {
  const { user, profile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const userNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tournaments", href: "/dashboard/tournaments", icon: Swords },
    { name: "My Contests", href: "/dashboard/contests", icon: Trophy },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Tournaments", href: "/admin/tournaments", icon: Swords },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Payments", href: "/admin/payments", icon: Wallet },
    { name: "History", href: "/admin/history", icon: History },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const navigation = isAdmin ? adminNavigation : userNavigation;

  return (
    <div className="min-h-screen bg-[var(--color-base-primary)] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--color-border-default)] bg-[var(--color-base-secondary)] sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[var(--color-comp-orange)]" />
          <span className="font-display font-bold text-lg">Dukestar</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[var(--color-base-secondary)] border-r border-[var(--color-border-default)] transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden md:flex items-center gap-3 p-6 border-b border-[var(--color-border-default)]">
          <Trophy className="w-8 h-8 text-[var(--color-comp-orange)]" />
          <span className="font-display font-bold text-xl tracking-tight">
            Dukestar<span className="text-[var(--color-accent-bright)]">.</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium",
                  isActive 
                    ? "bg-[var(--color-accent-deep)] text-white border-l-4 border-[var(--color-comp-orange)]" 
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-base-card)] hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-[var(--color-comp-orange)]" : "text-[var(--color-accent-bright)]")} />
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="p-4 border-t border-[var(--color-border-default)]">
          <button 
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[var(--color-comp-red)] hover:bg-[var(--color-comp-red)]/10 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-[var(--color-accent-deep)]">
              <AvatarFallback className="bg-[var(--color-base-card)] text-[var(--color-accent-bright)] font-bold">
                {profile?.nickname?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Welcome back,</p>
              <p className="font-bold text-white">@{profile?.username || "developer"}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isAdmin && (
              <div className="flex items-center gap-2 bg-[var(--color-base-card)] border border-[var(--color-comp-orange)]/30 px-4 py-2 rounded-full shadow-[0_0_10px_rgba(245,124,0,0.1)]">
                <Wallet className="w-4 h-4 text-[var(--color-comp-orange)]" />
                <span className="font-mono font-bold text-[var(--color-comp-highlight)]">
                  UGX {profile?.total_earnings?.toLocaleString() || "0"}
                </span>
              </div>
            )}
            <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-comp-red)] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
