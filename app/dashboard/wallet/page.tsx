"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function WalletPage() {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Wallet</h1>
          <p className="text-[var(--color-text-secondary)]">Manage your earnings and transaction history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[var(--color-accent-deep)] bg-gradient-to-br from-[var(--color-base-secondary)] to-[var(--color-base-primary)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet className="w-24 h-24 text-[var(--color-accent-bright)]" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono text-[var(--color-comp-highlight)]">
                UGX {profile?.total_earnings?.toLocaleString() || "0"}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono text-white">
                UGX 0
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">
                Pending Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono text-[var(--color-text-secondary)]">
                UGX 0
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[var(--color-border-default)]">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-[var(--color-border-default)] rounded-lg bg-[var(--color-base-primary)]/50">
              <Clock className="w-12 h-12 text-[var(--color-border-default)] mb-4" />
              <p className="text-[var(--color-text-secondary)]">No transactions yet.</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Join a tournament to start earning.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
