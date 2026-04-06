"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Swords, Wallet, TrendingUp } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState({
    revenueEarned: 0,
    totalUsers: 0,
    totalTournaments: 0,
    pendingPayouts: 0
  });

  const revenueData = [
    { name: 'Jan', revenue: 40000 },
    { name: 'Feb', revenue: 30000 },
    { name: 'Mar', revenue: 20000 },
    { name: 'Apr', revenue: 27800 },
    { name: 'May', revenue: 18900 },
    { name: 'Jun', revenue: 23900 },
    { name: 'Jul', revenue: 34900 },
  ];

  const growthData = [
    { name: 'Jan', users: 10 },
    { name: 'Feb', users: 15 },
    { name: 'Mar', users: 24 },
    { name: 'Apr', users: 35 },
    { name: 'May', users: 42 },
    { name: 'Jun', users: 58 },
    { name: 'Jul', users: 70 },
  ];

  useEffect(() => {
    if (!loading && profile?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [profile, loading, router]);

  useEffect(() => {
    if (profile?.role === "admin") {
      // Mock stats
      setStats({
        revenueEarned: 150000,
        totalUsers: 24,
        totalTournaments: 5,
        pendingPayouts: 2
      });
    }
  }, [profile]);

  if (loading || profile?.role !== "admin") {
    return <div className="min-h-screen bg-[var(--color-base-primary)] flex items-center justify-center text-white">Loading...</div>;
  }

  const statCards = [
    {
      title: "Revenue Earned (UGX)",
      value: stats.revenueEarned.toLocaleString(),
      icon: TrendingUp,
      color: "text-[var(--color-comp-highlight)]"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-[var(--color-accent-bright)]"
    },
    {
      title: "Total Tournaments",
      value: stats.totalTournaments,
      icon: Swords,
      color: "text-[var(--color-comp-orange)]"
    },
    {
      title: "Pending Payouts",
      value: stats.pendingPayouts,
      icon: Wallet,
      color: "text-[var(--color-comp-red)]"
    }
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Control Center</h1>
          <p className="text-[var(--color-text-secondary)]">Manage tournaments, users, and payouts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <Card key={i} className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Revenue per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `UGX ${value/1000}k`} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="revenue" fill="var(--color-comp-highlight)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="users" stroke="var(--color-accent-bright)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-accent-bright)' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
