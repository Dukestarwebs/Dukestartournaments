"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Archive } from "lucide-react";

export default function AdminHistoryPage() {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">History & Archives</h1>
          <p className="text-[var(--color-text-secondary)]">View completed tournaments and past records.</p>
        </div>

        <Card className="border-[var(--color-border-default)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-[var(--color-text-muted)]" />
              Completed Tournaments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[var(--color-border-default)] rounded-lg bg-[var(--color-base-primary)]/50">
              <History className="w-12 h-12 text-[var(--color-border-default)] mb-4" />
              <p className="text-[var(--color-text-secondary)]">No archived records found.</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Completed tournaments will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
