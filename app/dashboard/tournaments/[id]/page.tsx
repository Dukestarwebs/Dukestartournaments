"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function TournamentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      setLoading(true);
      // Mock data
      const mockTournaments = [
        { id: '1', name: 'AI Studio Hackathon 2026', description: 'Build the most innovative application using Google AI Studio and deploy it on Netlify.', prize: 500000, fee: 10000, max_users: 50, status: 'open', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '2', name: 'React UI Challenge', description: 'Create a stunning UI using React and Tailwind CSS.', prize: 200000, fee: 5000, max_users: 100, status: 'active', deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '3', name: 'Backend Performance Tuning', description: 'Optimize a given backend service for maximum throughput.', prize: 300000, fee: 7500, max_users: 30, status: 'closed', deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      ];
      
      const found = mockTournaments.find(t => t.id === params.id);
      setTournament(found);
      
      // Mock check if user is already joined
      if (params.id === '2') {
        setIsJoined(true);
      }
      
      setLoading(false);
    };

    fetchTournament();
  }, [params.id]);

  const handleJoin = async () => {
    setJoining(true);
    // Mock join process
    setTimeout(() => {
      alert(`Successfully joined ${tournament.name}! (Mock)`);
      setIsJoined(true);
      setJoining(false);
    }, 1000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64 text-[var(--color-text-muted)]">
          Loading tournament details...
        </div>
      </DashboardLayout>
    );
  }

  if (!tournament) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
          <p className="text-[var(--color-text-muted)]">Tournament not found.</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/tournaments')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tournaments
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Button variant="ghost" onClick={() => router.push('/dashboard/tournaments')} className="text-[var(--color-text-secondary)] hover:text-white -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tournaments
        </Button>

        <div className="relative rounded-xl overflow-hidden border border-[var(--color-accent-deep)] bg-[var(--color-base-secondary)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-base-primary)] via-[var(--color-base-primary)]/90 to-[var(--color-base-primary)]/50 z-10" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/code/1200/400')] bg-cover bg-center opacity-20" />
          
          <div className="relative z-20 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-deep)]/20 border border-[var(--color-accent-deep)]/50 text-[var(--color-accent-bright)] text-sm font-bold uppercase">
                  {tournament.status}
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                  {tournament.name}
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {tournament.description}
                </p>
              </div>

              <Card className="w-full md:w-80 shrink-0 border-[var(--color-border-default)] bg-[var(--color-base-primary)]/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-[var(--color-text-secondary)]">Prize Pool</p>
                    <div className="flex items-center gap-2 text-3xl font-mono font-bold text-[var(--color-comp-highlight)]">
                      <Trophy className="w-6 h-6" />
                      UGX {tournament.prize?.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-[var(--color-text-secondary)]">Entry Fee</p>
                    <p className="text-xl font-mono font-bold text-white">
                      UGX {tournament.fee?.toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border-default)]">
                    {isJoined ? (
                      <Button className="w-full bg-[var(--color-base-secondary)] text-[var(--color-accent-bright)] border border-[var(--color-accent-deep)] cursor-default hover:bg-[var(--color-base-secondary)]">
                        <CheckCircle className="w-4 h-4 mr-2" /> You are registered
                      </Button>
                    ) : tournament.status === 'closed' ? (
                      <Button className="w-full" disabled variant="outline">
                        Tournament Closed
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-[var(--color-comp-orange)] hover:bg-[var(--color-comp-highlight)] text-white font-bold py-6 text-lg shadow-[0_0_20px_rgba(245,124,0,0.3)]"
                        onClick={handleJoin}
                        disabled={joining}
                      >
                        {joining ? "Processing..." : "JOIN TOURNAMENT"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
                <Clock className="w-4 h-4" /> Deadline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-white">
                {new Date(tournament.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {new Date(tournament.deadline).toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
                <Users className="w-4 h-4" /> Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-white">
                0 / {tournament.max_users}
              </p>
              <div className="h-1.5 w-full bg-[var(--color-base-primary)] rounded-full overflow-hidden mt-2">
                <div className="h-full bg-[var(--color-accent-bright)]" style={{ width: '0%' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-white uppercase">
                {tournament.status}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {tournament.status === 'open' ? 'Accepting registrations' : 'Registration closed'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
