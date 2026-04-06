"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, ExternalLink, Send } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function MyContestsPage() {
  const { user } = useAuth();
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissionUrl, setSubmissionUrl] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      const fetchContests = async () => {
        // Mock data
        setContests([
          { id: 'p1', status: 'registered', submission_url: null, tournaments: { name: 'AI Studio Hackathon 2026', prize: 500000 } },
          { id: 'p2', status: 'submitted', submission_url: 'https://my-app.netlify.app', tournaments: { name: 'React UI Challenge', prize: 200000 } }
        ]);
        setLoading(false);
      };

      fetchContests();
    }
  }, [user]);

  const handleSubmit = async (participantId: string) => {
    const url = submissionUrl[participantId];
    if (!url) return;

    // Mock submission
    alert("Submission successful! (Mock)");
    const updated = contests.map(c => 
      c.id === participantId 
        ? { ...c, status: "submitted", submission_url: url } 
        : c
    );
    setContests(updated);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">My Contests</h1>
          <p className="text-[var(--color-text-secondary)]">Manage your active tournament submissions and view results.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="text-center py-8 text-[var(--color-text-muted)]">Loading contests...</div>
          ) : contests.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-muted)] border border-dashed border-[var(--color-border-default)] rounded-xl">
              You haven&apos;t joined any tournaments yet.
            </div>
          ) : (
            contests.map((contest) => (
              <Card key={contest.id} className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
                <CardHeader className="flex flex-row items-center justify-between border-b border-[var(--color-border-default)] pb-4">
                  <div>
                    <CardTitle className="text-xl">{contest.tournaments?.name || "Tournament"}</CardTitle>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      Status: <span className="text-[var(--color-accent-bright)] uppercase font-bold">{contest.status}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--color-text-secondary)]">Prize Pool</p>
                    <p className="font-mono font-bold text-[var(--color-comp-highlight)]">
                      UGX {contest.tournaments?.prize?.toLocaleString() || 0}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {contest.status === "registered" || contest.status === "active" ? (
                    <div className="space-y-4">
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Submit your Netlify project URL before the deadline.
                      </p>
                      <div className="flex gap-4">
                        <Input 
                          placeholder="https://your-project.netlify.app" 
                          value={submissionUrl[contest.id] || ""}
                          onChange={(e) => setSubmissionUrl({...submissionUrl, [contest.id]: e.target.value})}
                          className="flex-1"
                        />
                        <Button 
                          onClick={() => handleSubmit(contest.id)}
                          className="bg-[var(--color-comp-orange)] hover:bg-[var(--color-comp-highlight)]"
                        >
                          <Send className="w-4 h-4 mr-2" /> Submit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-base-primary)] border border-[var(--color-border-default)]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent-deep)]/20 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-[var(--color-accent-bright)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--color-text-secondary)]">Submission Received</p>
                          <a href={contest.submission_url} target="_blank" rel="noreferrer" className="text-sm text-[var(--color-accent-bright)] hover:underline flex items-center gap-1">
                            {contest.submission_url} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[var(--color-text-secondary)]">Result</p>
                        <p className="font-bold text-[var(--color-text-muted)]">Pending Review</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
