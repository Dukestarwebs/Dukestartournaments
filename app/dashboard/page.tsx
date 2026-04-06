"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Swords, Clock, Wallet } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    tournamentsJoined: 0,
    totalEarnings: 0,
    pendingResults: 0,
    tournamentsWon: 0
  });

  useEffect(() => {
    if (user) {
      // Mock stats
      setStats({
        tournamentsJoined: 3,
        totalEarnings: profile?.total_earnings || 150000,
        pendingResults: 1,
        tournamentsWon: profile?.tournaments_won || 2
      });
    }
  }, [user, profile]);

  const statCards = [
    {
      title: "Tournaments Joined",
      value: stats.tournamentsJoined,
      icon: Swords,
      color: "text-[var(--color-accent-bright)]"
    },
    {
      title: "Total Earnings (UGX)",
      value: stats.totalEarnings.toLocaleString(),
      icon: Wallet,
      color: "text-[var(--color-comp-highlight)]"
    },
    {
      title: "Pending Results",
      value: stats.pendingResults,
      icon: Clock,
      color: "text-[var(--color-text-secondary)]"
    },
    {
      title: "Tournaments Won",
      value: stats.tournamentsWon,
      icon: Trophy,
      color: "text-[var(--color-comp-orange)]"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
          <p className="text-[var(--color-text-secondary)]">Welcome to the arena. Here&apos;s your current standing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <Card key={i} className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50 hover:bg-[var(--color-base-secondary)] transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Swords className="w-12 h-12 text-[var(--color-border-default)] mb-4" />
                <p className="text-[var(--color-text-secondary)]">No recent activity found.</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">Join a tournament to get started.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Global Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-24 h-24 rounded-full border-4 border-[var(--color-border-default)] flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--color-comp-orange)] border-t-transparent animate-spin-slow" style={{ animationDuration: '3s' }}></div>
                  <span className="text-2xl font-bold font-mono text-white">#42</span>
                </div>
                <p className="text-center text-sm text-[var(--color-text-secondary)]">
                  Win tournaments to climb the global leaderboard.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
