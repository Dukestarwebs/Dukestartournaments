"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Swords, Upload, XCircle } from "lucide-react";

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState("");
  const [fee, setFee] = useState("");
  const [maxUsers, setMaxUsers] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setTournaments([
        { id: '1', name: 'AI Studio Hackathon 2026', prize: 500000, fee: 10000, max_users: 50, status: 'open' },
        { id: '2', name: 'React UI Challenge', prize: 200000, fee: 5000, max_users: 100, status: 'active' },
      ]);
      setLoading(false);
    };

    fetchTournaments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTournament = {
      id: Math.random().toString(),
      name,
      description,
      prize: parseInt(prize),
      fee: parseInt(fee),
      max_users: parseInt(maxUsers),
      deadline: new Date(deadline).toISOString(),
      status: "open"
    };

    setTournaments([newTournament, ...tournaments]);
    setIsCreating(false);
    setName("");
    setDescription("");
    setPrize("");
    setFee("");
    setMaxUsers("");
    setDeadline("");
  };

  const handleClose = (id: string) => {
    if (confirm("Are you sure you want to close this tournament? Users will no longer be able to join.")) {
      setTournaments(tournaments.map(t => t.id === id ? { ...t, status: 'closed' } : t));
    }
  };

  const handleUploadResults = (id: string) => {
    const winner = prompt("Enter the username of the winner:");
    if (winner) {
      alert(`Results uploaded! Winner: ${winner}. Tournament marked as completed.`);
      setTournaments(tournaments.map(t => t.id === id ? { ...t, status: 'completed', winner } : t));
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Tournament Management</h1>
            <p className="text-[var(--color-text-secondary)]">Create and manage active tournaments.</p>
          </div>
          <Button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-[var(--color-accent-bright)] hover:bg-[var(--color-accent-deep)]"
          >
            {isCreating ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> New Tournament</>}
          </Button>
        </div>

        {isCreating && (
          <Card className="border-[var(--color-accent-deep)] shadow-[0_0_20px_rgba(31,60,136,0.1)]">
            <CardHeader>
              <CardTitle>Create New Tournament</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tournament Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prize">Prize Pool (UGX)</Label>
                    <Input id="prize" type="number" value={prize} onChange={(e) => setPrize(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee">Entry Fee (UGX)</Label>
                    <Input id="fee" type="number" value={fee} onChange={(e) => setFee(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers">Max Participants</Label>
                    <Input id="maxUsers" type="number" value={maxUsers} onChange={(e) => setMaxUsers(e.target.value)} required />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 bg-[var(--color-comp-orange)] hover:bg-[var(--color-comp-highlight)]">
                  Create Tournament
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="text-center py-8 text-[var(--color-text-muted)]">Loading...</div>
          ) : tournaments.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-muted)] border border-dashed border-[var(--color-border-default)] rounded-xl">
              No tournaments found. Create one to get started.
            </div>
          ) : (
            tournaments.map((t) => (
              <Card key={t.id} className="border-[var(--color-border-default)] bg-[var(--color-base-secondary)]/50">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-base-primary)] flex items-center justify-center border border-[var(--color-border-default)]">
                      <Swords className="w-6 h-6 text-[var(--color-accent-bright)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{t.name}</h3>
                      <div className="flex gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span>Prize: <span className="text-[var(--color-comp-highlight)] font-mono">UGX {t.prize?.toLocaleString()}</span></span>
                        <span>Fee: <span className="font-mono">UGX {t.fee?.toLocaleString()}</span></span>
                        <span>Status: <span className="text-[var(--color-accent-bright)] uppercase">{t.status}</span></span>
                        {t.winner && <span>Winner: <span className="text-[var(--color-comp-orange)] font-bold">{t.winner}</span></span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {t.status !== 'completed' && (
                      <Button variant="outline" size="sm" onClick={() => handleUploadResults(t.id)}>
                        <Upload className="w-4 h-4 mr-2" /> Upload Results
                      </Button>
                    )}
                    {t.status !== 'closed' && t.status !== 'completed' && (
                      <Button variant="destructive" size="sm" onClick={() => handleClose(t.id)}>
                        <XCircle className="w-4 h-4 mr-2" /> Close
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
