"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNickname(profile.nickname || "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    // Mock update
    setTimeout(() => {
      alert("Profile updated successfully! (Mock)");
      setLoading(false);
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Profile & Settings</h1>
          <p className="text-[var(--color-text-secondary)]">Manage your account details and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user?.email || ""} disabled className="opacity-50 cursor-not-allowed" />
                  <p className="text-xs text-[var(--color-text-muted)]">Email cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={profile?.username || ""} disabled className="opacity-50 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname (Display Name)</Label>
                  <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Julypay)</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  <p className="text-xs text-[var(--color-comp-orange)]">This number will be used for your tournament payouts.</p>
                </div>
                <Button type="submit" className="mt-4 bg-[var(--color-accent-bright)] hover:bg-[var(--color-accent-deep)]" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
                <Button variant="outline" className="mt-4">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
