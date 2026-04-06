"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Ban, CheckCircle, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setUsers([
        { id: 'u1', nickname: 'Ninja', username: 'dev_ninja', phone: '256701111111', total_earnings: 150000, status: 'active' },
        { id: 'u2', nickname: 'Master', username: 'code_master', phone: '256702222222', total_earnings: 50000, status: 'active' },
        { id: 'u3', nickname: 'Rookie', username: 'new_dev', phone: '256703333333', total_earnings: 0, status: 'active' },
      ]);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleBlock = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    const action = newStatus === 'blocked' ? 'block' : 'unblock';
    
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">User Management</h1>
          <p className="text-[var(--color-text-secondary)]">View and manage registered developers.</p>
        </div>

        <Card className="border-[var(--color-border-default)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-accent-bright)]" />
              Registered Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-[var(--color-text-muted)]">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 text-[var(--color-text-muted)] border border-dashed border-[var(--color-border-default)] rounded-lg">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border-default)] text-[var(--color-text-muted)] text-sm">
                      <th className="pb-3 font-medium">Developer</th>
                      <th className="pb-3 font-medium">Contact</th>
                      <th className="pb-3 font-medium">Earnings (UGX)</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-[var(--color-border-default)]/50 hover:bg-[var(--color-base-primary)]/50 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white">{u.nickname}</div>
                          <div className="text-[var(--color-text-muted)] text-xs">@{u.username}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-[var(--color-text-secondary)]">{u.phone}</div>
                        </td>
                        <td className="py-4">
                          <div className="font-mono text-[var(--color-comp-highlight)]">{u.total_earnings?.toLocaleString() || "0"}</div>
                        </td>
                        <td className="py-4">
                          {u.status === 'active' ? (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-[var(--color-accent-deep)]/20 text-[var(--color-accent-bright)] border border-[var(--color-accent-deep)]/50">
                              <CheckCircle className="w-3 h-3" /> Active
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-[var(--color-comp-red)]/20 text-[var(--color-comp-red)] border border-[var(--color-comp-red)]/50">
                              <Ban className="w-3 h-3" /> Blocked
                            </div>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleBlock(u.id, u.status)}
                            >
                              <Ban className="w-3 h-3 mr-1" /> {u.status === 'active' ? 'Block' : 'Unblock'}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleDelete(u.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
