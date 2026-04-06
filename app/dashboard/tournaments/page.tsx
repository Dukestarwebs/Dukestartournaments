"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Users, ArrowRight } from "lucide-react";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      // Mock data
      setTournaments([
        { id: '1', name: 'AI Studio Hackathon 2026', prize: 500000, fee: 10000, max_users: 50, status: 'open' },
        { id: '2', name: 'React UI Challenge', prize: 200000, fee: 5000, max_users: 100, status: 'active' },
        { id: '3', name: 'Backend Performance Tuning', prize: 300000, fee: 7500, max_users: 30, status: 'closed' },
      ]);
      setLoading(false);
    };

    fetchTournaments();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Tournaments</h1>
          <p className="text-[var(--color-text-secondary)]">Join active tournaments and compete for real payouts.</p>
        </div>

        {/* Featured Tournament Banner */}
        <div className="relative rounded-xl overflow-hidden border border-[var(--color-accent-deep)] bg-[var(--color-base-secondary)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-base-primary)] via-[var(--color-base-primary)]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/code/1200/400')] bg-cover bg-center opacity-30" />
          
          <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-comp-red)]/20 border border-[var(--color-comp-red)]/50 text-[var(--color-comp-red)] text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-[var(--color-comp-red)] animate-pulse" />
                FEATURED
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                AI Studio Hackathon 2026
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Build the most innovative application using Google AI Studio and deploy it on Netlify.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-[var(--color-comp-highlight)] font-mono font-bold">
                  <Trophy className="w-4 h-4" />
                  UGX 500,000
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <Clock className="w-4 h-4" />
                  Ends in 7 days
                </div>
              </div>
            </div>
            <Button className="bg-[var(--color-comp-orange)] hover:bg-[var(--color-comp-highlight)] text-white font-bold px-8 py-6 text-lg shadow-[0_0_20px_rgba(245,124,0,0.3)]" asChild>
              <a href="/dashboard/tournaments/1">
                JOIN NOW - UGX 10,000
              </a>
            </Button>
          </div>
        </div>

        {/* Tournament List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-[var(--color-text-muted)]">Loading tournaments...</div>
          ) : tournaments.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[var(--color-text-muted)] border border-dashed border-[var(--color-border-default)] rounded-xl">
              No active tournaments at the moment. Check back later!
            </div>
          ) : (
            tournaments.map((t) => (
              <Card key={t.id} className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50 flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="px-2 py-1 rounded text-xs font-bold bg-[var(--color-accent-deep)]/20 text-[var(--color-accent-bright)] border border-[var(--color-accent-deep)]/50">
                      {t.status?.toUpperCase() || 'OPEN'}
                    </div>
                    <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-sm">
                      <Users className="w-4 h-4" />
                      <span>0/{t.max_users || 50}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{t.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-[var(--color-base-primary)] border border-[var(--color-border-default)]">
                      <span className="text-sm text-[var(--color-text-secondary)]">Prize Pool</span>
                      <span className="font-mono font-bold text-[var(--color-comp-highlight)]">UGX {t.prize?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-[var(--color-base-primary)] border border-[var(--color-border-default)]">
                      <span className="text-sm text-[var(--color-text-secondary)]">Entry Fee</span>
                      <span className="font-mono font-bold text-white">UGX {t.fee?.toLocaleString() || 0}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                        <span>Registration Progress</span>
                        <span>0%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--color-base-primary)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--color-accent-bright)]" style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <a href={`/dashboard/tournaments/${t.id}`}>
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
