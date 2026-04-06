"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Platform Settings</h1>
          <p className="text-[var(--color-text-secondary)]">Configure global platform parameters.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[var(--color-accent-bright)]" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="Dukestar Tournaments" />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@dukestar.com" />
              </div>
              <Button className="mt-4 bg-[var(--color-accent-bright)] hover:bg-[var(--color-accent-deep)]">Save Settings</Button>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Payment Configuration (Read-Only)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Julypay API Key</Label>
                <Input type="password" value="************************" disabled className="opacity-50" />
              </div>
              <div className="space-y-2">
                <Label>Julypay Webhook Secret</Label>
                <Input type="password" value="************************" disabled className="opacity-50" />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-4">
                Payment settings can only be modified via environment variables for security reasons.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
